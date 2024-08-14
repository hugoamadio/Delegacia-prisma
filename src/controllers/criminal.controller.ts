import { Request, Response } from "express";
import db from "../database/prisma.connection";

class CriminalController {
  public async create(req: Request, res: Response) {
    const { name, surname, cpf } = req.body;
    try {
      const criminal = await db.criminal.create({
        data: {
          name,
          surname,
          cpf,
        },
      });

      if (criminal) {
        return res.status(201).json({ success: true, msg: "Criminal created" });
      }

      return res
        .status(400)
        .json({ success: false, msg: "Criminal not created" });
    } catch (err) {
      return res.status(500).json({ success: false, msg: "Error Database" });
    }
  }

  public async list(req: Request, res: Response) {
    const criminal = await db.criminal.findMany();
    try {
      if (criminal) {
        return res.status(200).json({ success: true, data: criminal });
      }
      return res
        .status(400)
        .json({ success: false, msg: "Error on listing criminal" });
    } catch (err) {
      return res.status(500).json({ success: false, msg: "Error Database" });
    }
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const criminal = await db.criminal.findUnique({
        where: {
          id,
        },
      });
      if (criminal) {
        return res.status(200).json({ success: true, data: criminal });
      }
      return res
        .status(400)
        .json({ success: false, msg: "Error on show criminal" });
    } catch (err) {
      return res.status(500).json({ success: false, msg: "Error Database" });
    }
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, surname, cpf, crime } = req.body;
    try {
      const criminal = await db.criminal.findUnique({
        where: {
          id,
        },
      });
      if (!criminal) {
        return res
          .status(404)
          .json({ success: false, msg: "Criminal not found" });
      }

      await db.criminal.update({
        where: {
          id,
        },
        data: {
          name,
          surname,
          cpf,
          crime,
        },
      });

      return res.status(200).json({ success: true, msg: "Criminal updated" });
    } catch (err) {
      return res.status(500).json({ success: false, msg: "Error Database" });
    }
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const criminal = await db.criminal.findUnique({
        where: {
          id,
        },
      });
      if (!criminal) {
        return res
          .status(404)
          .json({ success: false, msg: "Criminal not found" });
      }

      await db.criminal.delete({
        where:{
            id
        }
      })

      return res.status(200).json({ success: true, msg: "Criminal deleted" });
    } catch (err) {
      return res.status(500).json({ success: false, msg: "Error Database" });
    }
  }
}

export default CriminalController;
