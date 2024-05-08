import { Controller, Param, Body, Delete, Get, Post, Put } from "@nestjs/common";

@Controller('blog')
export class BlogController {
    @Get()
    getAllPost() {
        console.log('가져오기');
    }

    @Post()
    createPlst(@Body() post: any) {
        console.log('게시글 작성');
        console.log(post);
    }

    @Get('/:id')
    getPost(@Param('id') id: string) {
        console.log('게시글 가져오기');
    }

    @Delete('/:id')
    deletePost() {
        console.log('게시글 삭제');
    }

    @Put('/:id')
    updatePost(@Param('id') id, @Body() post: any) {
        console.log('게시글 업데이트');
        console.log(post);
    }
}