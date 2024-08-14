import { Request, Response } from "express";
import db from "../database/prisma.connection";

class CrimeController {
  public async create(req: Request, res: Response) {
    const { idCriminal } = req.body;
    try {

      const crime = await db.crime.create({
        data:{
          idCriminal
        }
      })

      if (crime) {
        return res.status(201).json({ success: true, msg: "crime created" });
      }

      return res
        .status(400)
        .json({ success: false, msg: "crime not created" });
    } catch (err) {
      return res.status(500).json({ success: false, msg: "Error Database" });
    }
  }

  public async list(req: Request, res: Response) {
    const crime = await db.crime.findMany();
    try {
      if (crime) {
        return res.status(200).json({ success: true, data: crime });
      }
      return res
        .status(400)
        .json({ success: false, msg: "Error on listing crime" });
    } catch (err) {
      return res.status(500).json({ success: false, msg: "Error Database" });
    }
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const crime = await db.crime.findUnique({
        where:{
          id
        }
      })
      if (crime) {
        return res.status(200).json({ success: true, data: crime });
      }
      return res
        .status(400)
        .json({ success: false, msg: "Error on show crime"});
    } catch (err) {
      return res.status(500).json({ success: false, msg: "Error Database" });
    }
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { idCriminal } = req.body;
    try {
      const crime = await db.crime.findUnique({
        where: {
          id,
        },
      });
      if (!crime) {
        return res
          .status(404)
          .json({ success: false, msg: "crime not found" });
      }

      await db.crime.update({
        where: {
          id,
        },
        data: {
          idCriminal
        },
      });

      return res.status(200).json({ success: true, msg: "crime updated" });
    } catch (err) {
      return res.status(500).json({ success: false, msg: "Error Database" });
    }
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const crime = await db.crime.findUnique({
        where: {
          id,
        },
      });
      if (!crime) {
        return res
          .status(404)
          .json({ success: false, msg: "crime not found" });
      }

      await db.crime.delete({
        where:{
            id
        }
      })

      return res.status(200).json({ success: true, msg: "crime deleted" });
    } catch (err) {
      return res.status(500).json({ success: false, msg: "Error Database" });
    }
  }
}

export default CrimeController;
