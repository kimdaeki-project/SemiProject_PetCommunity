<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">

<title>find pw page</title>
<meta content="" name="description">
<meta content="" name="keywords">
<style>
  #my {
  margin: 0 auto;
}
</style>
</head>
<body>
<!-- header start -->
<c:import url="/WEB-INF/views/template/header.jsp"></c:import>
<!-- header end -->
<!-- ======= Join Section ======= -->
<section id="book-a-table" class="book-a-table">
  <div class="container" data-aos="fade-up">

    <div class="section-header">
      <p><span>Find PW page</span></p>
    </div>

      <div class="col-lg-8 align-items-center" id="my">
        <form action="findlogin" method="post" data-aos="fade-up" data-aos-delay="100" enctype="multipart/form-data"  id="loginfrm">
          <div class="row gy-4">
            <div class="col-lg-8 col-md-12">
              <input type="text" name="userId" class="form-control" placeholder="User ID"id="userId">
              <div class="validate"></div>
            </div>
            <div class="col-lg-8 col-md-12">
              <input type="text" name="email" class="form-control" placeholder="email" id="email">
              <div class="validate"></div>
            </div>
          </div>
          <br>
         <div class="text-center">
           <button type="submit" id="findpw" class="btn-book-a-table">Login</button>
         </div>
        </form>
      </div>

    </div>

</section>



<!-- footer start -->
<c:import url="/WEB-INF/views/template/footer.jsp"></c:import>
<!-- footer end -->

<!-- script start -->
<a href="#" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

<div id="preloader"></div>

<!-- Vendor JS Files -->
<script src="/resources/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="/resources/assets/vendor/aos/aos.js"></script>
<script src="/resources/assets/vendor/glightbox/js/glightbox.min.js"></script>
<script src="/resources/assets/vendor/purecounter/purecounter_vanilla.js"></script>
<script src="/resources/assets/vendor/swiper/swiper-bundle.min.js"></script>
<script src="/resources/assets/vendor/php-email-form/validate.js"></script>

<!-- Template Main JS File -->
<script src="/resources/assets/js/main.js"></script>

<!-- daum 지도 검색 api -->  
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
</body>
</html>