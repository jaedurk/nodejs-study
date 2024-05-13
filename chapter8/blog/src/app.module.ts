import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {BlogController} from './blog.controller';
import {BlogFileRepository, BlogMongoRepository} from "./blog.repository";
import {Blog, BlogSchema} from "./blog.schema";
import {BlogService} from './blog.service';

@Module({
    imports: [
        MongooseModule.forRoot(
          'mongodb+srv://jdlee:1004dangg@cluster0.vcd9cxy.mongodb.net/blog',
        ),
        MongooseModule.forFeature([{name: Blog.name, schema: BlogSchema}]),
    ],
    controllers: [BlogController],
    providers: [BlogService, BlogFileRepository, BlogMongoRepository],
})
export class AppModule {}
