<%@ params( fileID: String, comments: java.util.List<boxV2.comment.Element> ) %>

<html>
 <body>
  <h1>Comments for <a href="./BoxGetFile?FileID=${fileID}">File ${fileID}</a></h1>
  <ul>
     <%for(c in comments) { %>
       <li>${c.Message} by <b>${c.User.Name}</b> at ${c.Created} :userid: ${c.User.UserId}</li>
       <%}%>
  </ul>
 </body>
</html>