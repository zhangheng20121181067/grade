/**
 * Created by zh on 2017/5/27.
 */
$.ajax({
    type:"get",
    url:"tpl/header.html",
    success:function(headerData){
        $('.headerData').append(headerData)
    }
});
$.ajax({
    type:"get",
    url:"tpl/footer.html",
    success:function(hcontactFootData){
        $('.contactFoot').append(hcontactFootData)
    }
});