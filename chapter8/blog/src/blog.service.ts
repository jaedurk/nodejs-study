import { PostDto } from './blog.model';

export class BlogService {
    posts = [];

    getAllPosts() {
        return this.posts;
    }

    createPost(postDto: PostDto) {
        const id = this.posts.length + 1;
        this.posts.push({ id: id.toString(), ...postDto, createdDt: new Date() });
    }

    getPost(id) {

    }
}