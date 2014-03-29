function loadjs(c,d){var a=document.createElement("script");a.async=!0;a.type="text/javascript";a.src=c;a.charset=d||"gbk";(document.getElementsByTagName("HEAD")[0]||document.getElementsByTagName("BODY")[0]).appendChild(a)};
var _protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
function SetToolTip(obj){
  obj = $(obj || 'body').find('a');
  obj.mouseover(function(e){
    this.myTitle = this.title || this.innerText;
    this.myHref = decodeURI(this.href);
//    this.myHref = (this.myHref.length > 30 ? this.myHref.toString().substring(0,35)+"..." : this.myHref);
    this.title = "";
    var tooltip = "<div id='tooltip'><p>"+this.myTitle+"<em>"+this.myHref+"</em>"+"</p></div>";
    $('body').append(tooltip);
    $('#tooltip').css({"opacity":"0.8","top":(e.pageY+20)+"px","left":(e.pageX-10)+"px"}).show('fast');
  }).mouseout(function(){this.title = this.myTitle;$('#tooltip').remove();
  }).mousemove(function(e){$('#tooltip').css({"top":(e.pageY+20)+"px","left":(e.pageX-10)+"px"});
  });
}

function load_random_posts(obj){
  if (!obj) return;
  var count = $(obj).attr('data-count') || 6;
  arr = site.posts.slice();
  for (var i, tmp, n = arr.length; n; i = Math.floor(Math.random() * n), tmp = arr[--n], arr[n] = arr[i], arr[i] = tmp);
  arr = arr.slice(0,count);
  var html = '<ul class="list-group">';
  arr.forEach(function(item){html += '<li class="list-group-item"><a href="'+site.BASE_URI+ item.uri + '">' + (item.title || item.uri) + '</a></li>';})
  $(obj).html(html + '</ul>');
  SetToolTip(obj);
}

jQuery(document).ready(function($){
  SetToolTip();
  $('.content p:first-child').addClass("fp");
  $('.ajax_widgets').each(function(){var src=$(this).attr('data-src');if(src)$(this).load(site.BASE_URI + 'widgets/'+src+'.html',function(){SetToolTip(this)});});
  $.each(_js2load,function(index,obj){loadjs(obj.src,obj.charset)});
  $('.hexo_random_posts').each(function(){
    var c=this;
    if (!site.posts || !site.posts.length) $.getJSON(site.BASE_URI + 'js/posts.js',function(json){site.posts = json;load_random_posts(c)});
    else load_random_posts(c);
  });
})
