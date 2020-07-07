/** 
GET /authors
Get a list of available authors
Note: This only includes members involved with resources, either being their author or having reviewed a resource

**/
getAuthorList(pagination?: Pagination, fields: Fields = []): Promise<Array<Author>> {
  return new Promise<Array<Author>>(async (resolve, reject) => {
    let query = this.addPaginationAndFieldsToQuery(pagination, fields);
    try {
        const resultArr = await this.request("GET", `/authors`, query)
        resolve(this.mapTypeList(resultArr, Author));
    } catch (e) {
        reject(e)
    }
  });
}


/**
Alias of getAuthorList
**/
getAuthors(pagination?: Pagination, fields: Fields = []): Promise<Array<Author>> {
  return this.getAuthorList(pagination,fields);
}

/** 
GET /authors/{author}
Get details about an author

@param	author	Author ID
**/
getAuthorDetails(author: Id): Promise<Author> {
  return new Promise<Author>(async (resolve, reject) => {
    let query = {};
    try {
        const result = await this.request("GET", `/authors/${author}`, query)
        resolve(this.mapType(result, Author));
    } catch (e) {
        reject(e)
    }
  });
}


/**
Alias of getAuthorDetails
**/
getAuthor(author: Id): Promise<Author> {
  return this.getAuthorDetails(author);
}

/** 
GET /authors/{author}/resources
Get an author's resources

@param	author	Author ID
**/
getAuthorResources(author: Id, pagination?: Pagination, fields: Fields = []): Promise<Array<Resource>> {
  return new Promise<Array<Resource>>(async (resolve, reject) => {
    let query = this.addPaginationAndFieldsToQuery(pagination, fields);
    try {
        const resultArr = await this.request("GET", `/authors/${author}/resources`, query)
        resolve(this.mapTypeList(resultArr, Resource));
    } catch (e) {
        reject(e)
    }
  });
}


/** 
GET /authors/{author}/reviews
Get an author's reviews left on resources

@param	author	Author ID
**/
getAuthorReviews(author: Id, pagination?: Pagination, fields: Fields = []): Promise<Array<ResourceReview>> {
  return new Promise<Array<ResourceReview>>(async (resolve, reject) => {
    let query = this.addPaginationAndFieldsToQuery(pagination, fields);
    try {
        const resultArr = await this.request("GET", `/authors/${author}/reviews`, query)
        resolve(this.mapTypeList(resultArr, ResourceReview));
    } catch (e) {
        reject(e)
    }
  });
}


/** 
GET /categories
Get a list of categories

**/
getCategoryList(pagination?: Pagination, fields: Fields = []): Promise<Array<Category>> {
  return new Promise<Array<Category>>(async (resolve, reject) => {
    let query = this.addPaginationAndFieldsToQuery(pagination, fields);
    try {
        const resultArr = await this.request("GET", `/categories`, query)
        resolve(this.mapTypeList(resultArr, Category));
    } catch (e) {
        reject(e)
    }
  });
}


/**
Alias of getCategoryList
**/
getCategories(pagination?: Pagination, fields: Fields = []): Promise<Array<Category>> {
  return this.getCategoryList(pagination,fields);
}

/** 
GET /categories/{category}
Get details about a category

@param	category	Category ID
**/
getCategoryDetails(category: Id): Promise<Category> {
  return new Promise<Category>(async (resolve, reject) => {
    let query = {};
    try {
        const result = await this.request("GET", `/categories/${category}`, query)
        resolve(this.mapType(result, Category));
    } catch (e) {
        reject(e)
    }
  });
}


/**
Alias of getCategoryDetails
**/
getCategory(category: Id): Promise<Category> {
  return this.getCategoryDetails(category);
}

/** 
GET /categories/{category}/resources
Get the resources in a category

@param	category	Category ID
**/
getCategoryResources(category: Id, pagination?: Pagination, fields: Fields = []): Promise<Array<Resource>> {
  return new Promise<Array<Resource>>(async (resolve, reject) => {
    let query = this.addPaginationAndFieldsToQuery(pagination, fields);
    try {
        const resultArr = await this.request("GET", `/categories/${category}/resources`, query)
        resolve(this.mapTypeList(resultArr, Resource));
    } catch (e) {
        reject(e)
    }
  });
}


/** 
GET /resources
Get a list of available resources (premium and free)

**/
getResourceList(pagination?: Pagination, fields: Fields = []): Promise<Array<Resource>> {
  return new Promise<Array<Resource>>(async (resolve, reject) => {
    let query = this.addPaginationAndFieldsToQuery(pagination, fields);
    try {
        const resultArr = await this.request("GET", `/resources`, query)
        resolve(this.mapTypeList(resultArr, Resource));
    } catch (e) {
        reject(e)
    }
  });
}


/**
Alias of getResourceList
**/
getResources(pagination?: Pagination, fields: Fields = []): Promise<Array<Resource>> {
  return this.getResourceList(pagination,fields);
}

/** 
GET /resources/for/{version}
Get resources for the specified version(s)

@param	version	Version(s), separated by commas
@param	method	Method to use to check for versions
**/
getResourcesForVersions(version: string, method: string, pagination?: Pagination, fields: Fields = []): Promise<Array<Resource>> {
  return new Promise<Array<Resource>>(async (resolve, reject) => {
    let query = this.addPaginationAndFieldsToQuery(pagination, fields);
    query["method"] = method;
    try {
        const resultArr = await this.request("GET", `/resources/for/${version}`, query)
        resolve(this.mapTypeList(resultArr, Resource));
    } catch (e) {
        reject(e)
    }
  });
}


/** 
GET /resources/free
Get a list of available free resources

**/
getFreeResourceList(pagination?: Pagination, fields: Fields = []): Promise<Array<Resource>> {
  return new Promise<Array<Resource>>(async (resolve, reject) => {
    let query = this.addPaginationAndFieldsToQuery(pagination, fields);
    try {
        const resultArr = await this.request("GET", `/resources/free`, query)
        resolve(this.mapTypeList(resultArr, Resource));
    } catch (e) {
        reject(e)
    }
  });
}


/**
Alias of getFreeResourceList
**/
getFreeResources(pagination?: Pagination, fields: Fields = []): Promise<Array<Resource>> {
  return this.getFreeResourceList(pagination,fields);
}

/** 
GET /resources/new
Get all new resources

**/
getNewResources(pagination?: Pagination, fields: Fields = []): Promise<Array<Resource>> {
  return new Promise<Array<Resource>>(async (resolve, reject) => {
    let query = this.addPaginationAndFieldsToQuery(pagination, fields);
    try {
        const resultArr = await this.request("GET", `/resources/new`, query)
        resolve(this.mapTypeList(resultArr, Resource));
    } catch (e) {
        reject(e)
    }
  });
}


/** 
GET /resources/premium
Get a list of available premium resources

**/
getPremiumResourceList(pagination?: Pagination, fields: Fields = []): Promise<Array<Resource>> {
  return new Promise<Array<Resource>>(async (resolve, reject) => {
    let query = this.addPaginationAndFieldsToQuery(pagination, fields);
    try {
        const resultArr = await this.request("GET", `/resources/premium`, query)
        resolve(this.mapTypeList(resultArr, Resource));
    } catch (e) {
        reject(e)
    }
  });
}


/**
Alias of getPremiumResourceList
**/
getPremiumResources(pagination?: Pagination, fields: Fields = []): Promise<Array<Resource>> {
  return this.getPremiumResourceList(pagination,fields);
}

/** 
GET /resources/{resource}
Get a resource by its ID

@param	resource	Resource ID
**/
getResourceDetails(resource: Id): Promise<Resource> {
  return new Promise<Resource>(async (resolve, reject) => {
    let query = {};
    try {
        const result = await this.request("GET", `/resources/${resource}`, query)
        resolve(this.mapType(result, Resource));
    } catch (e) {
        reject(e)
    }
  });
}


/**
Alias of getResourceDetails
**/
getResource(resource: Id): Promise<Resource> {
  return this.getResourceDetails(resource);
}

/** 
GET /resources/{resource}/author
Get the resource author

@param	resource	Resource ID
**/
getResourceAuthor(resource: Id): Promise<Author> {
  return new Promise<Author>(async (resolve, reject) => {
    let query = {};
    try {
        const result = await this.request("GET", `/resources/${resource}/author`, query)
        resolve(this.mapType(result, Author));
    } catch (e) {
        reject(e)
    }
  });
}


/** 
GET /resources/{resource}/reviews
Get reviews of a resource

@param	resource	Resource ID
**/
getResourceReviews(resource: Id, pagination?: Pagination, fields: Fields = []): Promise<Array<ResourceReview>> {
  return new Promise<Array<ResourceReview>>(async (resolve, reject) => {
    let query = this.addPaginationAndFieldsToQuery(pagination, fields);
    try {
        const resultArr = await this.request("GET", `/resources/${resource}/reviews`, query)
        resolve(this.mapTypeList(resultArr, ResourceReview));
    } catch (e) {
        reject(e)
    }
  });
}


/** 
GET /resources/{resource}/updates
Get updates of a resource

@param	resource	Resource ID
**/
getResourceUpdates(resource: Id, pagination?: Pagination, fields: Fields = []): Promise<Array<ResourceUpdate>> {
  return new Promise<Array<ResourceUpdate>>(async (resolve, reject) => {
    let query = this.addPaginationAndFieldsToQuery(pagination, fields);
    try {
        const resultArr = await this.request("GET", `/resources/${resource}/updates`, query)
        resolve(this.mapTypeList(resultArr, ResourceUpdate));
    } catch (e) {
        reject(e)
    }
  });
}


/** 
GET /resources/{resource}/updates/latest
Get the latest resource update

@param	resource	Resource ID
**/
getLatestResourceUpdate(resource: Id, pagination?: Pagination, fields: Fields = []): Promise<ResourceUpdate> {
  return new Promise<ResourceUpdate>(async (resolve, reject) => {
    let query = this.addPaginationAndFieldsToQuery(pagination, fields);
    try {
        const result = await this.request("GET", `/resources/${resource}/updates/latest`, query)
        resolve(this.mapType(result, ResourceUpdate));
    } catch (e) {
        reject(e)
    }
  });
}


/** 
GET /resources/{resource}/versions
Get versions of a resource

@param	resource	Resource ID
**/
getResourceVersions(resource: Id, pagination?: Pagination, fields: Fields = []): Promise<Array<ResourceVersion>> {
  return new Promise<Array<ResourceVersion>>(async (resolve, reject) => {
    let query = this.addPaginationAndFieldsToQuery(pagination, fields);
    try {
        const resultArr = await this.request("GET", `/resources/${resource}/versions`, query)
        resolve(this.mapTypeList(resultArr, ResourceVersion));
    } catch (e) {
        reject(e)
    }
  });
}


/** 
GET /resources/{resource}/versions/latest
Get the latest resource version

@param	resource	Resource ID
**/
getLatestResourceVersion(resource: Id): Promise<ResourceVersion> {
  return new Promise<ResourceVersion>(async (resolve, reject) => {
    let query = {};
    try {
        const result = await this.request("GET", `/resources/${resource}/versions/latest`, query)
        resolve(this.mapType(result, ResourceVersion));
    } catch (e) {
        reject(e)
    }
  });
}


/** 
GET /resources/{resource}/versions/{version}
Get a specific resource version by its ID

@param	resource	Resource ID
@param	version	Version ID
**/
getResourceVersion(resource: Id, version: Id): Promise<ResourceVersion> {
  return new Promise<ResourceVersion>(async (resolve, reject) => {
    let query = {};
    try {
        const result = await this.request("GET", `/resources/${resource}/versions/${version}`, query)
        resolve(this.mapType(result, ResourceVersion));
    } catch (e) {
        reject(e)
    }
  });
}


/** 
GET /search/authors/{query}
Search authors

@param	query	Search query
@param	field	Field to search in
**/
getAuthorSearch(query: string, field: string, pagination?: Pagination, fields: Fields = []): Promise<Array<Author>> {
  return new Promise<Array<Author>>(async (resolve, reject) => {
    let query = this.addPaginationAndFieldsToQuery(pagination, fields);
    query["field"] = field;
    try {
        const resultArr = await this.request("GET", `/search/authors/${query}`, query)
        resolve(this.mapTypeList(resultArr, Author));
    } catch (e) {
        reject(e)
    }
  });
}


/** 
GET /search/resources/{query}
Search resources

@param	query	Search query
@param	field	Field to search in
**/
getResourceSearch(query: string, field: string, pagination?: Pagination, fields: Fields = []): Promise<Array<Resource>> {
  return new Promise<Array<Resource>>(async (resolve, reject) => {
    let query = this.addPaginationAndFieldsToQuery(pagination, fields);
    query["field"] = field;
    try {
        const resultArr = await this.request("GET", `/search/resources/${query}`, query)
        resolve(this.mapTypeList(resultArr, Resource));
    } catch (e) {
        reject(e)
    }
  });
}


/** 
GET /status
Get the API status

**/
getAPIStatus(): Promise<any> {
  return new Promise<any>(async (resolve, reject) => {
    let query = {};
    try {
        const result = await this.request("GET", `/status`, query)
        resolve(result);
    } catch (e) {
        reject(e)
    }
  });
}


/** 
DELETE /webhook/delete/{id}/{secret}
Delete a Webhook

@param	id	Webhook ID
@param	secret	Webhook Secret
**/
deleteDeleteWebhook(id: string, secret: string): Promise<any> {
  return new Promise<any>(async (resolve, reject) => {
    let query = {};
    try {
        const result = await this.request("DELETE", `/webhook/delete/${id}/${secret}`, query)
        resolve(result);
    } catch (e) {
        reject(e)
    }
  });
}


/** 
GET /webhook/events
Get a list of available events

**/
getWebhookEvents(): Promise<any> {
  return new Promise<any>(async (resolve, reject) => {
    let query = {};
    try {
        const result = await this.request("GET", `/webhook/events`, query)
        resolve(result);
    } catch (e) {
        reject(e)
    }
  });
}


/** 
POST /webhook/register
Register a new Webhook

Use this form to easily register a new one: https://spiget.org/webhook/

@param	url	URL to call
@param	events	Events to register
**/
postRegisterWebhook(url: string, events: Array<string>): Promise<any> {
  return new Promise<any>(async (resolve, reject) => {
    let query = {};
    query["url"] = url;
    query["events"] = events;
    try {
        const result = await this.request("POST", `/webhook/register`, query)
        resolve(result);
    } catch (e) {
        reject(e)
    }
  });
}


/** 
GET /webhook/status/{id}
Get the status of a Webhook

@param	id	ID of the Webhook
**/
getWebhookStatus(id: string): Promise<any> {
  return new Promise<any>(async (resolve, reject) => {
    let query = {};
    try {
        const result = await this.request("GET", `/webhook/status/${id}`, query)
        resolve(result);
    } catch (e) {
        reject(e)
    }
  });
}


