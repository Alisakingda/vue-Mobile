import Mock from "mockjs";
const Random = Mock.Random;

export default Mock.mock("msg", getData);

function getData() {
  let articles = [];

  for (let i = 0; i < 100; i++) {
    let newArticleObject = {
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      thumbnail_pic_s: Random.dataImage("100x100", "mock的图片"), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date() + " " + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    };

    articles.push(newArticleObject);
  }

  return {
    articles: articles
  };
}
