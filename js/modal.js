/**
 * Created by zh on 2017/5/27.
 */



/*取窗口滚动条高度*/
function getScrollTop(){
    var scrollTop=0;
    if(document.documentElement&&document.documentElement.scrollTop) {
        scrollTop=document.documentElement.scrollTop;
    } else if(document.body) {
        scrollTop=document.body.scrollTop;
    }
    return scrollTop;
}


function openToast(obj){
    var data={
        title:obj.title?obj.title:"title",
        intro:obj.intro?obj.intro:"intro"
    };
    var content;
    content="";
    content='<div class="modal"></div> ' +
        '<div class="pop"> ' +
        '<div class="tdBox clear"> ' +
        '</div> ' +
        '<div class="sure">确认' +
        '</div> ' +
        '</div>';


    $("body").append(content);

    var str="";
    for(var i=0;i<16;i++){
        str+='<div class="td">'+obj[i].grade+'</div><div class="td">'+obj[i].rank+'</div>';
    }
    $(".tdBox").empty();
    $(".tdBox").prepend(str);


    var pop=document.getElementsByClassName("pop")[0];
    var modal=document.getElementsByClassName("modal")[0];
    var $bodyHeight=document.body.offsetHeight;
    modal.style.height=$bodyHeight+"px";

    popShow(pop,modal)
}


/*$("body").append('<div class="modal"></div> ' +
    '<div class="pop"> ' +
    '<h3>在线投递简历</h3> ' +
    '<div class="way"> ' +
    '<h4>联系方式：</h4> ' +
    '<input class="first firstName" type="text" value="姓名*"> ' +
    '<input class="telephone" type="text" value="电话*"> ' +
    '<select name="area" id="area"> ' +
    '<option value="地区">地区*</option> ' +
    '<option value="武汉">武汉</option> ' +
    '<option value="北京">北京</option> ' +
    '<option value="上海">上海</option> ' +
    '</select> ' +
    '<a href="#">在线投递</a> ' +
    '</div> ' +
    '<div class="cancel"> ' +
    '</div> ' +
    '</div>');*/

//打开模态框
function openModal(modal){
    modal.style.display="block";
}
//关闭模态框
function closeModal(modal){
    modal.style.display="none";
}

//弹出框打开时
function popShow(elm,modal){

    //打开模态框
    openModal(modal);

    //窗口变化时
    window.onresize=function(){
        popShow(elm);
    };
    //定位
    elm.style.display="block";
    var l=(document.documentElement.clientWidth-elm.offsetWidth)/2;
    var t=(document.documentElement.clientHeight-elm.offsetHeight)/2;
   // console.log(document.documentElement.clientHeight,elm.offsetHeight);
    elm.style.left=l+'px';
    elm.style.top=t+'px';  //定位高度等于滚轮高度加上可视窗高度

    //投递和取消事件
    //var send=elm.getElementsByTagName("a")[0];
    var sure=elm.getElementsByClassName("sure")[0];
    //点击确认时 模态弹出均消失
    sure.onclick=function(e){
        e.stopPropagation();
        document.body.removeChild(elm);
        document.body.removeChild(modal);
       /* elm.style.display="none";
        closeModal(modal);*/
    };

  /* //除弹出框外文档的任意位置点击时弹出框消失
   document.onclick=function(){
        elm.style.display="none";
        closeModal(modal);
   };*/

    //阻止弹出框冒泡
   elm.onclick=function(event) {
        event = event ? event : window.event;
       // var obj = event.srcElement ? event.srcElement : event.target;
        if (event && event.stopPropagation) {
            // this code is for Mozilla and Opera
            event.stopPropagation();
        } else if (window.event) {
            // this code is for IE
            window.event.cancelBubble = true;
        }
   }
}
