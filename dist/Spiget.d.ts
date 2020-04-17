import { AxiosInstance, Method } from "axios";
import Resource from "./types/Resource";
import ResourceFile from "./types/ResourceFile";
import Icon from "./types/Icon";
import ResourceVersion from "./types/ResourceVersion";
import ResourceUpdate from "./types/ResourceUpdate";
import ResourceRating from "./types/ResourceRating";
import ResourceReview from "./types/ResourceReview";
import Author from "./types/Author";
import Category from "./types/Category";
import Error from "./Error";
import { Pagination } from "./Pagination";
import SpigetType, { Constructor as TypeConstructor } from "./SpigetType";
export declare class Spiget {
    __apiBase: String;
    __spigotMcUrl: String;
    axios: AxiosInstance;
    constructor(userAgent?: string, apiBase?: string, spigotMcUrl?: string);
    __request(method?: Method, endpoint?: string, query?: {}, body?: {}): Promise<any>;
    __addPaginationAndFieldsToQuery(pagination: Pagination, fields: Fields, query?: any): any;
    __mapType<T extends SpigetType>(data: any, type: TypeConstructor<T>): T;
    __mapTypeList<T extends SpigetType>(data: any, type: TypeConstructor<T>): Array<T>;
    /**
     GET /status
     Get the API status

     **/
    getAPIStatus(): Promise<any>;
    /**
     GET /authors
     Get a list of available authors
     Note: This only includes members involved with resources, either being their author or having reviewed a resource

     **/
    getAuthorList(pagination?: Pagination, fields?: Fields): Promise<Array<Author>>;
    /**
     Alias of getAuthorList
     **/
    getAuthors(pagination?: Pagination, fields?: Fields): Promise<Array<Author>>;
    /**
     GET /authors/{author}
     Get details about an author

     @param	author	Author ID
     **/
    getAuthorDetails(author: Id): Promise<Author>;
    /**
     Alias of getAuthorDetails
     **/
    getAuthor(author: Id): Promise<Author>;
    /**
     GET /authors/{author}/resources
     Get an author's resources

     @param	author	Author ID
     **/
    getAuthorResources(author: Id, pagination?: Pagination, fields?: Fields): Promise<Array<Resource>>;
    /**
     GET /authors/{author}/reviews
     Get an author's reviews left on resources

     @param	author	Author ID
     **/
    getAuthorReviews(author: Id, pagination?: Pagination, fields?: Fields): Promise<Array<ResourceReview>>;
    /**
     GET /categories
     Get a list of categories

     **/
    getCategoryList(pagination?: Pagination, fields?: Fields): Promise<Array<Category>>;
    /**
     Alias of getCategoryList
     **/
    getCategories(pagination?: Pagination, fields?: Fields): Promise<Array<Category>>;
    /**
     GET /categories/{category}
     Get details about a category

     @param	category	Category ID
     **/
    getCategoryDetails(category: Id): Promise<Category>;
    /**
     Alias of getCategoryDetails
     **/
    getCategory(category: Id): Promise<Category>;
    /**
     GET /categories/{category}/resources
     Get the resources in a category

     @param	category	Category ID
     **/
    getCategoryResources(category: Id, pagination?: Pagination, fields?: Fields): Promise<Array<Resource>>;
    /**
     GET /resources
     Get a list of available resources (premium and free)

     **/
    getResourceList(pagination?: Pagination, fields?: Fields): Promise<Array<Resource>>;
    /**
     Alias of getResourceList
     **/
    getResources(pagination?: Pagination, fields?: Fields): Promise<Array<Resource>>;
    /**
     GET /resources/for/{version}
     Get resources for the specified version(s)

     @param	version	Version(s), separated by commas
     @param	method	Method to use to check for versions
     **/
    getResourcesForVersions(version: string, method: string, pagination?: Pagination, fields?: Fields): Promise<Array<Resource>>;
    /**
     GET /resources/free
     Get a list of available free resources

     **/
    getFreeResourceList(pagination?: Pagination, fields?: Fields): Promise<Array<Resource>>;
    /**
     Alias of getFreeResourceList
     **/
    getFreeResources(pagination?: Pagination, fields?: Fields): Promise<Array<Resource>>;
    /**
     GET /resources/new
     Get all new resources

     **/
    getNewResources(pagination?: Pagination, fields?: Fields): Promise<Array<Resource>>;
    /**
     GET /resources/premium
     Get a list of available premium resources

     **/
    getPremiumResourceList(pagination?: Pagination, fields?: Fields): Promise<Array<Resource>>;
    /**
     Alias of getPremiumResourceList
     **/
    getPremiumResources(pagination?: Pagination, fields?: Fields): Promise<Array<Resource>>;
    /**
     GET /resources/{resource}
     Get a resource by its ID

     @param	resource	Resource ID
     **/
    getResourceDetails(resource: Id): Promise<Resource>;
    /**
     Alias of getResourceDetails
     **/
    getResource(resource: Id): Promise<Resource>;
    /**
     GET /resources/{resource}/author
     Get the resource author

     @param	resource	Resource ID
     **/
    getResourceAuthor(resource: Id): Promise<Author>;
    /**
     GET /resources/{resource}/reviews
     Get reviews of a resource

     @param	resource	Resource ID
     **/
    getResourceReviews(resource: Id, pagination?: Pagination, fields?: Fields): Promise<Array<ResourceReview>>;
    /**
     GET /resources/{resource}/updates
     Get updates of a resource

     @param	resource	Resource ID
     **/
    getResourceUpdates(resource: Id, pagination?: Pagination, fields?: Fields): Promise<Array<ResourceUpdate>>;
    /**
     GET /resources/{resource}/versions
     Get versions of a resource

     @param	resource	Resource ID
     **/
    getResourceVersions(resource: Id, pagination?: Pagination, fields?: Fields): Promise<Array<ResourceVersion>>;
    /**
     GET /resources/{resource}/versions/latest
     Get the latest resource version

     @param	resource	Resource ID
     **/
    getLatestResourceVersion(resource: Id): Promise<ResourceVersion>;
    /**
     GET /resources/{resource}/versions/{version}
     Get a specific resource version by its ID

     @param	resource	Resource ID
     @param	version	Version ID
     **/
    getResourceVersion(resource: Id, version: Id): Promise<ResourceVersion>;
    /**
     GET /search/authors/{query}
     Search authors

     @param	query	Search query
     @param	field	Field to search in
     **/
    getAuthorSearch(query: string, field: string, pagination?: Pagination, fields?: Fields): Promise<Array<Author>>;
    /**
     GET /search/resources/{query}
     Search resources

     @param	query	Search query
     @param	field	Field to search in
     **/
    getResourceSearch(query: string, field: string, pagination?: Pagination, fields?: Fields): Promise<Array<Resource>>;
}
export default Spiget;
export declare type Id = number;
export declare type IdOrName = number | string;
export declare type Fields = Array<string>;
export { Author, Category, Icon, Resource, ResourceFile, ResourceRating, ResourceReview, ResourceUpdate, ResourceVersion };
export { Pagination, Error, SpigetType };
