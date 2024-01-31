import { Injectable } from '@nestjs/common';
import { UpdateImageDto } from './dto/update-image.dto';
import { Schema, model, connect, models } from 'mongoose';
//import sharp from 'sharp';
const sharp = require('sharp');

@Injectable()
export class ImagesService {
  async create(file: Express.Multer.File, workerId: string) {
    const encodedImage = file.buffer.toString('base64');
    const imageBuffer = await this.compactImage(encodedImage);

    const imageSchema = new Schema<IImage>({
      id: { type: String, required: true },
      image: { type: String, required: true },
    });

    const Image = models.images || model<IImage>('images', imageSchema);
    await connect('mongodb+srv://makeservice-stg:ve7JVGQwCpsWikIeD1WtsqRg3Uda@make-service.glnid9c.mongodb.net/images');

    const image = new Image({
      id: workerId,
      image: imageBuffer,
    });

    console.log(image);

    await image.save();
  }

  findAll() {
    return `This action returns all images`;
  }

  async findOne(id: number): Promise<IImage> {
    const imageSchema = new Schema<IImage>({
      id: { type: String, required: true },
      image: { type: String, required: true },
    });

    const Image = models.images || model<IImage>('images', imageSchema);
    await connect('mongodb+srv://makeservice-stg:ve7JVGQwCpsWikIeD1WtsqRg3Uda@make-service.glnid9c.mongodb.net/images');

    const image: IImage = await Image.findOne({ id: id });

    return image;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }

  async compactImage(base64String, qualityPercent = 50, reductionResolution: number = 0.6): Promise<string> {
    try {
      const imageBuffer = Buffer.from(base64String, 'base64');
      const imageBufferMetada = await sharp(imageBuffer).metadata();

      const newWidth = Math.round((1 - reductionResolution) * imageBufferMetada.width!);
      const newHeight = Math.round((1 - reductionResolution) * imageBufferMetada.height!);

      const compressedBuffer = await sharp(imageBuffer)
        .resize({
          width: newWidth,
          height: newHeight,
        })
        .toFormat('jpeg', { quality: qualityPercent })
        .toBuffer();

      const compressedBase64String = compressedBuffer.toString('base64');
      return compressedBase64String;
    } catch (error) {
      console.error('Erro ao comprimir a imagem:', error);
      throw error;
    }
  }
}
