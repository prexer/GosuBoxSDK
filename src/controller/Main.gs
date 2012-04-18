package controller

uses ronin.*

/**
 * This is the default out of the box controller.  You can modify it or set a different
 * default controller in config.RoninConfig
 */
class Main extends RoninController {


  function index() {
    view.Main.render(Writer)
  }

  function helloRonin() :String {
    return "Hello Ronin"
  }

  function BoxCopyFile(fileID="0"):String {
    var jsonResponse = boxgw.apiv2.fileCopy(fileID)
    return jsonResponse
  }

  function BoxFileGetComments(fileID="0") {
    var jsonResponse = boxgw.apiv2.fileCommentsGet(fileID)

    var comments = boxV2.comment.parse(jsonResponse)

    view.FileComments.render(Writer, fileID,  comments)

    //return jsonResponse
  }

  function BoxFileAddComment(fileID="0",comment="no comment"):String{
    var jsonResponse = boxgw.apiv2.fileCommentAdd(fileID,comment)
    return jsonResponse
  }

  function BoxAddFolder(parentFolderID="0", folderName="test"):String{
    var jsonResponse = boxgw.apiv2.FolderCreate(folderName, parentFolderID)
    return jsonResponse
  }

  function BoxDeleteFolder(folderID=""): String {
    var jsonResponse = boxgw.apiv2.folderDelete(folderID)
    return jsonResponse
  }

  function BoxFileModify(fileID="0", name="", description="")   : String {
    var jsonResponse = boxgw.apiv2.fileUpdate(fileID, name, description)

    return jsonResponse
  }


  function BoxGetFile(fileID ="0"):String  {
    var jsonResponse = boxgw.apiv2.fileGet(fileID)

    return jsonResponse
  }

  function BoxGetFolder(folderID ="0"):String  {
    var jsonResponse = boxgw.apiv2.folderGet(folderID)

    return jsonResponse
  }


  function helloBox():String {
      return    "Hello  Box"

  }

}