import { Request, Response } from "express";
import db from "../database/prisma.connection";

class ArmController {
  public async create(req: Request, res: Response) {
    const { year, ammunation, idCrime } = req.body;
    try {

      const arm = await db.arm.create({
        data:{
          ammunation,
          year,
          idCrime
        }
      })

      if (arm) {
        return res.status(201).json({ success: true, msg: "Arm created" });
      }

      return res
        .status(400)
        .json({ success: false, msg: "arm not created" });
    } catch (err) {
      return res.status(500).json({ success: false, msg: "Error Database" });
    }
  }

  public async list(req: Request, res: Response) {
    const arm = await db.arm.findMany();
    try {
      if (arm) {
        return res.status(200).json({ success: true, data: arm });
      }
      return res
        .status(400)
        .json({ success: false, msg: "Error on listing arm" });
    } catch (err) {
      return res.status(500).json({ success: false, msg: "Error Database" });
    }
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const arm = await db.arm.findUnique({
        where: {
          id,
        },
      });
      if (arm) {
        return res.status(200).json({ success: true, data: arm });
      }
      return res
        .status(400)
        .json({ success: false, msg: "Error on show arm" });
    } catch (err) {
      return res.status(500).json({ success: false, msg: "Error Database" });
    }
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { year, ammunation, idCrime } = req.body;
    try {
      const arm = await db.arm.findUnique({
        where: {
          id,
        },
      });
      if (!arm) {
        return res
          .status(404)
          .json({ success: false, msg: "arm not found" });
      }

      await db.arm.update({
        where: {
          id,
        },
        data: {
          year,
          ammunation,
          idCrime,
        },
      });

      return res.status(200).json({ success: true, msg: "arm updated" });
    } catch (err) {
      return res.status(500).json({ success: false, msg: "Error Database" });
    }
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const arm = await db.arm.findUnique({
        where: {
          id,
        },
      });
      if (!arm) {
        return res
          .status(404)
          .json({ success: false, msg: "arm not found" });
      }

      await db.arm.delete({
        where:{
            id
        }
      })

      return res.status(200).json({ success: true, msg: "arm deleted" });
    } catch (err) {
      return res.status(500).json({ success: false, msg: "Error Database" });
    }
  }
}

export default ArmController;
