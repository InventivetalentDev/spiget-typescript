class Paths {
/**
GET /authors
Get a list of available authors
Note: This only includes members involved with resources, either being their author or having reviewed a resource

**/
getAuthorList(pagination: Pagination, fields: Fields): Promise<Array<Author>> {
  return new Promise<Array<Author>>((resolve, reject) => {
    let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
    this.__request("GET", "/authors", query).then(resArr => {
      resolve(this.__mapTypeList(resArr, Author));
    }).catch(reject);
  });
}


/**
GET /authors/{author}
Get details about an author

**/
getAuthorDetails(author: string): Promise<Author> {
  return new Promise<Author>((resolve, reject) => {
    let query = {};
    this.__request("GET", "/authors/"+author+"", query).then(res => {
      resolve(this.__mapType(res, Author));
    }).catch(reject);
  });
}


/**
GET /authors/{author}/resources
Get an author's resources

**/
getAuthorresources(author: string, pagination: Pagination, fields: Fields): Promise<Array<Resource>> {
  return new Promise<Array<Resource>>((resolve, reject) => {
    let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
    this.__request("GET", "/authors/"+author+"/resources", query).then(resArr => {
      resolve(this.__mapTypeList(resArr, Resource));
    }).catch(reject);
  });
}


/**
GET /authors/{author}/reviews
Get an author's reviews left on resources

**/
getAuthorreviews(author: string, pagination: Pagination, fields: Fields): Promise<Array<ResourceReview>> {
  return new Promise<Array<ResourceReview>>((resolve, reject) => {
    let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
    this.__request("GET", "/authors/"+author+"/reviews", query).then(resArr => {
      resolve(this.__mapTypeList(resArr, ResourceReview));
    }).catch(reject);
  });
}


/**
GET /categories
Get a list of categories

**/
getCategoryList(pagination: Pagination, fields: Fields): Promise<Array<Category>> {
  return new Promise<Array<Category>>((resolve, reject) => {
    let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
    this.__request("GET", "/categories", query).then(resArr => {
      resolve(this.__mapTypeList(resArr, Category));
    }).catch(reject);
  });
}


/**
GET /categories/{category}
Get details about a category

**/
getCategoryDetails(category: string): Promise<Category> {
  return new Promise<Category>((resolve, reject) => {
    let query = {};
    this.__request("GET", "/categories/"+category+"", query).then(res => {
      resolve(this.__mapType(res, Category));
    }).catch(reject);
  });
}


/**
GET /categories/{category}/resources
Get the resources in a category

**/
getCategoryResources(category: string, pagination: Pagination, fields: Fields): Promise<Array<Resource>> {
  return new Promise<Array<Resource>>((resolve, reject) => {
    let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
    this.__request("GET", "/categories/"+category+"/resources", query).then(resArr => {
      resolve(this.__mapTypeList(resArr, Resource));
    }).catch(reject);
  });
}


/**
GET /resources
Get a list of available resources (premium and free)

**/
getResourceList(pagination: Pagination, fields: Fields): Promise<Array<Resource>> {
  return new Promise<Array<Resource>>((resolve, reject) => {
    let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
    this.__request("GET", "/resources", query).then(resArr => {
      resolve(this.__mapTypeList(resArr, Resource));
    }).catch(reject);
  });
}


/**
GET /resources/for/{version}
Get resources for the specified version(s)

**/
getResourcesforVersions(version: string, method: string, pagination: Pagination, fields: Fields): Promise<Array<Resource>> {
  return new Promise<Array<Resource>>((resolve, reject) => {
    let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
    query["method"] = method;
    this.__request("GET", "/resources/for/"+version+"", query).then(resArr => {
      resolve(this.__mapTypeList(resArr, Resource));
    }).catch(reject);
  });
}


/**
GET /resources/free
Get a list of available free resources

**/
getFreeResourceList(pagination: Pagination, fields: Fields): Promise<Array<Resource>> {
  return new Promise<Array<Resource>>((resolve, reject) => {
    let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
    this.__request("GET", "/resources/free", query).then(resArr => {
      resolve(this.__mapTypeList(resArr, Resource));
    }).catch(reject);
  });
}


/**
GET /resources/new
Get all new resources

**/
getNewResources(pagination: Pagination, fields: Fields): Promise<Array<Resource>> {
  return new Promise<Array<Resource>>((resolve, reject) => {
    let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
    this.__request("GET", "/resources/new", query).then(resArr => {
      resolve(this.__mapTypeList(resArr, Resource));
    }).catch(reject);
  });
}


/**
GET /resources/premium
Get a list of available premium resources

**/
getPremiumResourceList(pagination: Pagination, fields: Fields): Promise<Array<Resource>> {
  return new Promise<Array<Resource>>((resolve, reject) => {
    let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
    this.__request("GET", "/resources/premium", query).then(resArr => {
      resolve(this.__mapTypeList(resArr, Resource));
    }).catch(reject);
  });
}


/**
GET /resources/{resource}
Get a resource by its ID or name

**/
getResourceDetails(resource: string): Promise<Resource> {
  return new Promise<Resource>((resolve, reject) => {
    let query = {};
    this.__request("GET", "/resources/"+resource+"", query).then(res => {
      resolve(this.__mapType(res, Resource));
    }).catch(reject);
  });
}


/**
GET /resources/{resource}/author
Get the resource author

**/
getResourceAuthor(resource: string): Promise<Author> {
  return new Promise<Author>((resolve, reject) => {
    let query = {};
    this.__request("GET", "/resources/"+resource+"/author", query).then(res => {
      resolve(this.__mapType(res, Author));
    }).catch(reject);
  });
}


/**
GET /resources/{resource}/download
Download a resource

**/
getResourceDownload(resource: string): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    let query = {};
    this.__request("GET", "/resources/"+resource+"/download", query).then(res => {
      resolve(this.__mapType(res, any));
    }).catch(reject);
  });
}


/**
GET /resources/{resource}/reviews
Get reviews of a resource

**/
getResourceReviews(resource: string, pagination: Pagination, fields: Fields): Promise<Array<ResourceReview>> {
  return new Promise<Array<ResourceReview>>((resolve, reject) => {
    let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
    this.__request("GET", "/resources/"+resource+"/reviews", query).then(resArr => {
      resolve(this.__mapTypeList(resArr, ResourceReview));
    }).catch(reject);
  });
}


/**
GET /resources/{resource}/updates
Get updates of a resource

**/
getResourceUpdates(resource: string, pagination: Pagination, fields: Fields): Promise<Array<ResourceUpdate>> {
  return new Promise<Array<ResourceUpdate>>((resolve, reject) => {
    let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
    this.__request("GET", "/resources/"+resource+"/updates", query).then(resArr => {
      resolve(this.__mapTypeList(resArr, ResourceUpdate));
    }).catch(reject);
  });
}


/**
GET /resources/{resource}/versions
Get versions of a resource

**/
getResourceVersions(resource: string, pagination: Pagination, fields: Fields): Promise<Array<ResourceVersion>> {
  return new Promise<Array<ResourceVersion>>((resolve, reject) => {
    let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
    this.__request("GET", "/resources/"+resource+"/versions", query).then(resArr => {
      resolve(this.__mapTypeList(resArr, ResourceVersion));
    }).catch(reject);
  });
}


/**
GET /resources/{resource}/versions/{version}/download
Download a specific resource version

Note: This only redirects to the stored download location and might not download a file (i.e. for external resources)

**/
getResourceVersionDownload(resource: string, version: string) {
  return new any((resolve, reject) => {
    let query = {};
    this.__request("GET", "/resources/"+resource+"/versions/"+version+"/download", query).then(res => {
      resolve(this.__mapType(res, any));
    }).catch(reject);
  });
}


/**
GET /search/authors/{query}
Search authors

**/
getAuthorSearch(query: string, field: string, pagination: Pagination, fields: Fields): Promise<Array<Author>> {
  return new Promise<Array<Author>>((resolve, reject) => {
    let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
    query["field"] = field;
    this.__request("GET", "/search/authors/"+query+"", query).then(resArr => {
      resolve(this.__mapTypeList(resArr, Author));
    }).catch(reject);
  });
}


/**
GET /search/resources/{query}
Search resources

**/
getResourceSearch(query: string, field: string, pagination: Pagination, fields: Fields): Promise<Array<Resource>> {
  return new Promise<Array<Resource>>((resolve, reject) => {
    let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
    query["field"] = field;
    this.__request("GET", "/search/resources/"+query+"", query).then(resArr => {
      resolve(this.__mapTypeList(resArr, Resource));
    }).catch(reject);
  });
}


/**
GET /status
Get the API status

**/
getAPIStatus(): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    let query = {};
    this.__request("GET", "/status", query).then(res => {
      resolve(this.__mapType(res, any));
    }).catch(reject);
  });
}


/**
DELETE /webhook/delete/{id}/{secret}
Delete a Webhook

**/
deleteDeleteWebhook(id: string, secret: string): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    let query = {};
    this.__request("DELETE", "/webhook/delete/"+id+"/"+secret+"", query).then(res => {
      resolve(this.__mapType(res, any));
    }).catch(reject);
  });
}


/**
GET /webhook/events
Get a list of available events

**/
getWebhookevents(): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    let query = {};
    this.__request("GET", "/webhook/events", query).then(res => {
      resolve(this.__mapType(res, any));
    }).catch(reject);
  });
}


/**
POST /webhook/register
Register a new Webhook

Use this form to easily register a new one: https://spiget.org/webhook/

**/
postRegisterWebhook(url: string, events: Array<string>,): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    let query = {};
    this.__request("POST", "/webhook/register", query).then(res => {
      resolve(this.__mapType(res, any));
    }).catch(reject);
  });
}


/**
GET /webhook/status/{id}
Get the status of a Webhook

**/
getWebhookStatus(id: string): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    let query = {};
    this.__request("GET", "/webhook/status/"+id+"", query).then(res => {
      resolve(this.__mapType(res, any));
    }).catch(reject);
  });
}


}
