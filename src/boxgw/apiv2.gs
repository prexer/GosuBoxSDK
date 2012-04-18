package boxgw

uses org.apache.http.client.HttpClient
uses java.util.Map
uses org.apache.http.HttpResponse
uses org.apache.http.util.EntityUtils
uses java.net.URL
uses gw.util.GosuExceptionUtil
uses org.apache.http.impl.client.DefaultHttpClient
uses java.net.URI
uses org.apache.http.client.utils.URIUtils
uses org.apache.http.client.utils.URLEncodedUtils
uses org.apache.http.client.methods.HttpGet
uses org.apache.http.client.entity.UrlEncodedFormEntity
uses org.apache.http.client.methods.HttpPost
uses org.apache.http.message.BasicNameValuePair
uses java.util.ArrayList;
uses org.apache.http.Header
uses org.apache.http.message.BasicHeader
uses java.util.HashMap
uses org.apache.http.protocol.HTTP
uses org.apache.http.client.methods.HttpPut
uses org.apache.http.entity.StringEntity
uses java.io.*
uses java.lang.UnsupportedOperationException
uses org.apache.http.client.methods.HttpDelete

class apiv2 {

  static var _baseURL = boxV2.config.base_url
  static var _client : HttpClient = new DefaultHttpClient()


  static function fileGet(id: String) : String{
    var url = _baseURL+"files/"+id
    return handleCall("GET", url ,  "")
  }
  
  static function fileCommentsGet(id: String) :String {
    var url = _baseURL+"files/"+id+"/comments"
    return handleCall("GET", url,  "")
  }

  static function fileCommentAdd(id: String, comment: String) : String{
    var url = _baseURL+"files/"+id+"/comments"
    var jsonString = "{\"comment\": { \"message\": \""+comment+"\"}}"
    return handleCall("POST", url, jsonString)
  }

  static function CommentDelete(id: String) : String{
    var url = _baseURL+"comments/"+id
    return handleCall("POST", url, "")
  }

  static function fileCopy(id: String) : String{
    var url = _baseURL+"files/"+id+"/copy"
    return handleCall("POST", url ,  "")
  }

  static function fileUpdate(id: String, newName: String, description : String) : String {
    var url = _baseURL+"files/"+id
    var jsonString = "{\"name\":\""+newName+"\", \"description\":\""+description+"\"}"
    return handleCall("PUT", url , jsonString)
  }

  static function fileDelete(id:String) : String{
    var url = _baseURL+"files/"+id
    return handleCall("DELETE", url , "")
  }

  static function fileVersionsGet(id:String) : String {
    var url = _baseURL+"files/"+id+"/versions"
    return handleCall("GET", url ,  "")
  }

  static function fileVersionInfo(fileID:String, versionID : String) : String {
    var url = _baseURL+"files/"+fileID+"?version="+versionID
    return handleCall("GET", url ,  "")
  }

  static function fileVersionDelete(fileID:String, versionID : String) : String {
    var url = _baseURL+"files/"+fileID+"/versions/"+versionID
    return handleCall("DELETE", url ,  "")
  }


  static function folderGet(id : String) :String{
    var url = _baseURL+"folders/"+id
    return handleCall("GET", url ,  "")

  }

  static function FolderCreate(folderName: String, parentFolderID: String) : String{
    var url = _baseURL+"folders/"+parentFolderID
    var jsonString = "{\"name\": \""+folderName+"\"}"
    return handleCall("POST", url, jsonString)
  }

  static function FolderUpdate(FolderID: String, newName : String, parentFolderID : String) : String{
    var url = _baseURL+"folders/"+FolderID
    var jsonString = "{\"name\": \""+newName+"\", \"parent_folder\""+parentFolderID+"\"}"
    return handleCall("PUT", url, jsonString)
  }

  static function folderDelete(folderID: String) : String{
    var url = _baseURL+"folders/"+folderID
    return handleCall("DELETE", url, "")
  }


  private static function handleCall(method: String , url: String , json: String): String {
      try {
        var resp : HttpResponse
        if ("GET".equalsIgnoreCase(method)) {
          resp = doGet(new URL(url))
        } else if("POST".equalsIgnoreCase(method)) {
          resp = doPost(json, new URL(url))
        } else if("PUT".equalsIgnoreCase(method)){
          resp = doPut(json, new URL(url))
        } else if("DELETE".equalsIgnoreCase(method)){
          resp = doDelete(new URL(url))
        }
        else {
          throw new UnsupportedOperationException("Unsupported http method")
        }
        return EntityUtils.toString(resp.getEntity())
      }
      catch (e) {
          throw GosuExceptionUtil.forceThrow(e)
      }
    }

  private static function doGet(url: URL) : HttpResponse {    
    var uri = URIUtils.createURI(url.getProtocol(), url.getHost(), url.getPort(), url.getPath(), URLEncodedUtils.format(new ArrayList<BasicNameValuePair>(), "UTF-8"), null)
    var getObj = new HttpGet(uri)

    getObj.addHeader(getAuthorizationHeader())

    return _client.execute(getObj)
  }

  private static function doPost(json: String, url : URL) : HttpResponse {

    var uri = URIUtils.createURI(url.getProtocol(), url.getHost(), url.getPort(), url.getPath(), "", null);

    var postObject = new HttpPost(uri);
    postObject.addHeader(getAuthorizationHeader())

    postObject.setEntity(new StringEntity(json)) 
    return _client.execute(postObject)
  }

  private static static function doPut(json: String, url : URL) : HttpResponse {
    var uri = URIUtils.createURI(url.getProtocol(), url.getHost(), url.getPort(), url.getPath(), "", null);
    var putObject = new HttpPut(uri);

    putObject.addHeader(getAuthorizationHeader())
    putObject.setEntity(new StringEntity(json))

    return _client.execute(putObject);
  }

  private static static function doDelete(url : URL) : HttpResponse {
    var uri = URIUtils.createURI(url.getProtocol(), url.getHost(), url.getPort(), url.getPath(), "", null);
    var deleteObject = new HttpDelete(uri);

    deleteObject.addHeader(getAuthorizationHeader())

    return _client.execute(deleteObject);
  }

  private static function getAuthorizationHeader() : BasicHeader {
    try{

      var api_key =   boxV2.config.api_key
      var auth_token = boxV2.config.auth_token

      var authorization = "BoxAuth "+api_key+"&"+auth_token
      return new BasicHeader("Authorization", authorization)

    } catch (e) {
      throw new UnsupportedOperationException("Cannot find authorization")

    }
  }
}