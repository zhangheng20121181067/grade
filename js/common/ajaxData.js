/**
 * Created by zh on 2017/8/8.
 */
/* https://m.mallcoo.cn/a/open/User/V2/OAuth/CardInfo?AppID=59794b1b88ce7e167cd55f93&PublicKey=7db34c5a142fb3b&
 CallbackUrl=http://open1.ufunet.cn/pages/h5/2017/0801/index.html*/

// var $baseUrl="http://open1.ufunet.cn";   //上传ip地址  http://101.37.70.47

$(function(){
    //获取新排名
    var $Ticket= GetQueryString("Ticket");
    var $DataSource= GetQueryString("DataSource");
    console.log($Ticket,$DataSource);

    NewPm();
    function NewPm(){
        $.ajax({
            type: "post",
            url:"/zshijc/get_rank",
            data:{
                "Ticket": $Ticket,
                "DataSource": $DataSource
            },
            success: function (data) {
                console.log("data1---"+JSON.stringify(data));
                if(data.status==1){
                    if(!localStorage.getItem("$localData")){                 //第一次加载时localStorage为空
                        var dataStr=JSON.stringify(data);
                        console.log("data2---"+dataStr);
                        localStorage.setItem("$localData", dataStr);
                        ajaxData(data);
                    }else{                                                      //localStorage中有数据时
                        $localData= localStorage.getItem("$localData");
                        $parseLocalData=JSON.parse($localData);

                        ajaxData($parseLocalData);   //先加载缓存的数据（增加修改）
                        console.log("data3---"+JSON.stringify($parseLocalData));

                        for (var key in data) {
                            if (data[key] != $parseLocalData[key]) {    // 数据有更新时
                                var newStr=JSON.stringify(data);
                                localStorage.setItem("$localData", newStr); //将新数据保存在本地

                                $localData=localStorage.getItem("$localData");     //（增加修改后）
                                setTimeout(function(){
                                    $parseLocalData=JSON.parse($localData);
                                    ajaxData($parseLocalData);    //再加载更新的数据
                                   // console.log("data4---"+JSON.stringify($parseLocalData));
                                },1000);
                                break;
                            }
                        }
                        //ajaxData($parseLocalData);  （删除修改后）
                    }
                }else{
                    ajaxData( JSON.parse( localStorage.getItem("$localData") ) );     //（增加修改后）
                    alert("Ticket已经过期，请重新进入")
                }
            }
        });
    }
    //数据加载
    function ajaxData(shuju){
      //  console.log(JSON.stringify(shuju));
        var $rank=shuju.data.rank;   //前十排名

        var before_list=shuju.data.before_list;   //前五排名
        var $user=shuju.data.user;                 //自己的信息
        var after_list=shuju.data.after_list;   //后五排名

        var str="";
        for(var i= 0,beforelength=before_list.length;i<beforelength;i++){
            str+="<div><ul><li class='shenglue'>"+before_list[i].nickname+"</li><li>"+before_list[i].credits+"</li>" +
                "<li>"+before_list[i].honor+"</li><li>第<span class='mingci'>"+before_list[i].ranks+"</span>名</li></ul></div>";
        }
        str+="<div class='green'><ul><li class='shenglue'>"+$user.nickname+"</li><li>"+$user.credits+"</li>" +
            "<li>"+$user.honor+"</li><li>第<span class='mingci'>"+$user.ranks+"</span>名</li></ul></div>";

        for(var i= 0,afterLength=after_list.length;i<afterLength;i++){
            str+="<div><ul><li class='shenglue'>"+after_list[i].nickname+"</li><li>"+after_list[i].credits+"</li>" +
                "<li>"+after_list[i].honor+"</li><li>第<span class='mingci'>"+after_list[i].ranks+"</span>名</li></ul></div>";
        }
        $(".eleven").empty().append(str);      //先清空原数据再插入新数据

        var topStr="";
        for(var i= 0,$rankLength=$rank.length;i<$rankLength;i++){
            topStr+="<div><ul><li class='shenglue'>"+$rank[i].nickname+"</li><li>"+$rank[i].credits+"</li>" +
                "<li>"+$rank[i].honor+"</li><li>第<span class='mingci'>"+$rank[i].ranks+"</span>名</li></ul></div>";
        }
        $(".topHundred").empty().append(topStr);      //先清空原数据再插入新数据

        //昵称做省略处理
        $(".shenglue").each(function(){
            var text=$(this).text();
            //console.log(text,text.length);
            if(text.length>=5){
                text=text.substring(0,4)+"...";
                $(this).text(text)
            }
        });

        var $userPic=$(".user .userPic");          //头像
        var $userNickName=$(".user .nickName");    //昵称
     //   var $userLevel=$(".user .card");
        var $userCredits=$(".user .jifen");        //积分
        var $userHonor=$(".user .honor");          //头衔
        var $userRanks=$(".myOrder .mingci");      //排名
        $userPic.css({"background-image":"url("+$user.avatar+")"});
        $userNickName.text($user.nickname);
      //  $userLevel.text($user.user_level);
        $userCredits.text($user.credits);
        $userHonor.text($user.honor);
        $userRanks.text($user.ranks);


        var $dengji=$(".dengji");
        var $card=$(".user .card");
        var jifen=$user.credits;

        if(jifen>=30000){
            $dengji.find("span:lt(6)").addClass("block");
            $card.text("LV15")
        }else if(jifen>=25000){
            $dengji.find("span:lt(5)").addClass("block");
            $card.text("LV14")
        }else if(jifen>=20000){
            $dengji.find("span:lt(4)").addClass("block");
            $card.text("LV13")
        }else if(jifen>=15000){
            $dengji.find("span:lt(3)").addClass("block");
            $card.text("LV12")
        }else if(jifen>=10000){
            $dengji.find("span:lt(2)").addClass("block").siblings().eq(2).addClass("block").removeClass("guan");
            $card.text("LV11")
        }else if(jifen>=9000){
            $dengji.find("span:lt(2)").addClass("block");
            $card.text("LV10")
        }else if(jifen>=8000){
            $dengji.find("span:lt(5)").addClass("block").removeClass("guan").siblings().eq(0).addClass("guan");
            $card.text("LV9")
        }else if(jifen>=7000){
            $dengji.find("span:lt(4)").addClass("block").removeClass("guan").siblings().eq(0).addClass("guan");
            $card.text("LV8")
        }else if(jifen>=6000){
            $dengji.find("span:lt(3)").addClass("block").removeClass("guan").siblings().eq(0).addClass("guan");
            $card.text("LV7")
        }else if(jifen>=5000){
            $dengji.find("span:lt(2)").addClass("block").removeClass("guan").siblings().eq(0).addClass("guan");
            $card.text("LV6")
        }else if(jifen>=4000){
            $dengji.find("span").eq(0).addClass("block");
            $card.text("LV5")
        }else if(jifen>=3000){
            $dengji.find("span:lt(4)").addClass("zuan block").removeClass("guan");
            $card.text("LV4")
        }else if(jifen>=2000){
            $dengji.find("span:lt(3)").addClass("zuan block").removeClass("guan");
            $card.text("LV3")
        }else if(jifen>=1000){
            $dengji.find("span:lt(2)").addClass("zuan block").removeClass("guan");
            $card.text("LV2")
        }else if(jifen>=0){
            $dengji.find("span").eq(0).addClass("zuan block").removeClass("guan");
            $card.text("LV1")
        }
    }

});