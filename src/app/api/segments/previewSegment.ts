import { Request, Response } from 'express';

// Preview segment audience
export const previewSegment = async (req: Request, res: Response): Promise<void> => {
  try {

  } catch (error) {
    console.error('Error previewing segment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

