import conf from '../conf/conf';
import { Client, Databases, ID, Query, Storage} from 'appwrite'

export class Service {
      client = new Client()
      databases;
      bucket;

      constructor(){
        this.client
           .setEndpoint(conf.appwriteUrl)
           .setProject(conf.appwriteProjectId)
        this.database= new Databases(this.client);
        this.bucket = new Storage(this.client)
      }

      async createPost ({title, status, content, userId, featuredImage, slug}){
        console.log('featuredImage', featuredImage)
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    status,
                    content,
                    featuredImage,
                    userId,
                }
            )
        } catch (error) {
            console.log("appwrite serive :: createPost :: error", error ) 
        }

      }

      async updatePost(slug , {title, status,content, featuredImage}){
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, 
                {
                    title,
                    featuredImage,
                    status,
                    content,
                }
            )
        } catch (error) {
            console.log("appwrite serive :: updatePost :: error", error ) 
        }

      }
      
      async deletePost(slug){
        try {
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, 
            )
            return true;

        } catch (error) {
            console.log("appwrite serive :: deletePost :: error", error ) 
        }
        return false; 
      }

      async getPost(slug){
        try {
           return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                 
            )
        } catch (error) {
            console.log("appwrite serive :: getPost :: error", error ) 
        }
         
      }

      async getPosts(){
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("status", "active")]
            )
        } catch (error) {
            console.log("appwrite serive :: getPosts :: error", error ) 
            return false;
        }
      }

      //file upload service

      async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("appwrite serive :: uploadFIle :: error", error ) 
        }

      }

      async deleteFile (fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("appwrite serive :: deleteFIle :: error", error )
            return false; 
        }

      }

       getFilePreview(fileId){
         return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
         )
        
      }
}
   


const service = new Service();
export default service;