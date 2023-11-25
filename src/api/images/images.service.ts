import { Injectable } from '@nestjs/common';
import { UpdateImageDto } from './dto/update-image.dto';
import { Schema, model, connect, models } from 'mongoose';
@Injectable()
export class ImagesService {
  async create(file: Express.Multer.File, workerId: string) {
    const encodedImage = file.buffer.toString('base64');

    interface IImage {
      id: string;
      image: string;
    }

    const imageSchema = new Schema<IImage>({
      id: { type: String, required: true },
      image: { type: String, required: true },
    });

    const Image = models.images || model<IImage>('images', imageSchema);

    await connect('mongodb+srv://makeservice-stg:ve7JVGQwCpsWikIeD1WtsqRg3Uda@make-service.glnid9c.mongodb.net/images');

    const image = new Image({
      id: workerId,
      image: encodedImage,
    });

    console.log(image);

    await image.save();
  }

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
