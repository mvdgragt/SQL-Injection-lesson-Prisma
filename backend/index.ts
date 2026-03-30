import "dotenv/config";
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post("/api/login", async (req, res) => {
  const { email } = req.body as { email: string; password: string };
  const mode = req.query.mode as string;

  if (mode === "vulnerable") {
    const sql = `SELECT id, name, email, city, admin::text AS admin, phone FROM "User" WHERE email = '${email}'`;

    try {
      const rows = (await prisma.$queryRawUnsafe(sql)) as Array<{
        id: number;
        name: string;
        email: string;
        admin: string;
      }>;

      if (rows.length === 0) {
        res.json({ success: false, executedSQL: sql });
        return;
      }

      const mapUser = (row: (typeof rows)[0]) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        admin: row.admin === "true",
      });

      res.json({
        success: true,
        user: mapUser(rows[0]),
        executedSQL: sql,
        rowCount: rows.length,
        ...(rows.length > 1 && { allUsers: rows.map(mapUser) }),
      });
    } catch (error) {
      res.json({
        success: false,
        executedSQL: sql,
        error: (error as Error).message,
      });
    }
    return;
  }

  // Safe mode — Prisma parameterized query
  try {
    const user = await prisma.user.findFirst({
      where: { email },
      select: { id: true, name: true, email: true, admin: true },
    });

    res.json({
      success: !!user,
      user: user ?? undefined,
      executedSQL: `SELECT id, name, email, admin FROM "User"\nWHERE email = $1  -- $1 = '${email}'`,
    });
  } catch (error) {
    res.json({ success: false, error: (error as Error).message });
  }
});

app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
});
