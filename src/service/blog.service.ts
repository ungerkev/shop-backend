import { Service } from 'typedi';

@Service()
export class BlogService {
    constructor() { }

    public secret(username: string): void {
        console.log('secret page');
    }
}
