import express from 'express';

import catchAsyncMiddleware from "../../bMiddleware/bCatchAsyncMiddleware";
import { BaseModel } from "../aModel/aBaseModel";


const baseController = (Model=BaseModel, Label="Base") => ({
  // List
  list: catchAsyncMiddleware(
    async (request: express.Request, response: express.Response, nex: express.NextFunction) => {
      
      // List
      const list = await Model.find();
      
      // Response
      response.status(200).json({
        success: true,
        message: `${Label} Listed Successfully`,
        list: list
      })
    }
  ),

  // Create
  create: catchAsyncMiddleware(
    async (request: express.Request, response: express.Response, next: express.NextFunction) => {

      // Create
      const create = await Model.create(request.body)

      // Response
      response.status(200).json({
        success: true,
        message: `${Label} Created Successfully`,
        create: create
      })
    }
  )
})

export default baseController;
