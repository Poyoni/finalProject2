import { Request, Response } from 'express';
import TerrorAttack from '../models/attackModel';
import { ObjectId } from 'mongodb';

export const addNewAttack = async (req: Request, res: Response) => {
    try {
        const newAttack = new TerrorAttack(req.body);
        await newAttack.save();
        res.status(201).json(newAttack);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getAttack = async (req: Request, res: Response) => {
    const  eventid  = new ObjectId(req.params.id);
    try {
        const attack = await TerrorAttack.findOne({ eventid: eventid });
        res.status(200).json(attack);
    } catch (error) {
        res.status(500).json(error);
    }
}
export const updateAttack = async (req: Request, res: Response) => {
    const  eventid  = new ObjectId(req.params.id);
    try {
        const updatedAttack = await TerrorAttack.findByIdAndUpdate(eventid, req.body, { new: true });
        res.status(200).json(updatedAttack);
    } catch (error) {
        res.status(500).json(error);
    }
}
export const deleteAttack = async (req: Request, res: Response) => {
    const  eventid  = new ObjectId(req.params.id);    
    try {
        await TerrorAttack.findByIdAndDelete(eventid);
        res.status(200).json({ message: 'Attack deleted successfully' });
    } catch (error) {
        res.status(500).json(error);
    }
}