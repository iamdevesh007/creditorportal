</div>
</div>
</div>
<!-- main content area end -->
<!-- footer area start-->
<footer>
    <div class="footer-area">
        <p>© <?php echo date('Y'); ?>, ELEPHANT Insurance Pvt Ltd. All Rights Reserved.</p>
    </div>
</footer>
<!-- footer area end-->
</div>
<!-- main wrapper start -->

<!-- Bootstrap js-->
<script src="<?php echo base_url(); ?>assets/js/popper.min.js"></script>
<script src="<?php echo base_url(); ?>assets/js/bootstrap.min.js"></script>
<script src="<?php echo base_url(); ?>assets/js/owl.carousel.min.js"></script>
<script src="<?php echo base_url(); ?>assets/js/metisMenu.min.js"></script>
<script src="<?php echo base_url(); ?>assets/js/jquery.slimscroll.min.js"></script>
<script src="<?php echo base_url(); ?>assets/js/jquery.slicknav.min.js"></script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>



<!--script admin-->
<!--<script src="<?php echo base_url(); ?>assets/js/admin-script.js"></script>
<script src="<?php echo base_url(); ?>assets/js/main.js"></script>-->

<!-- others plugins -->
<script src="<?php echo base_url(); ?>assets/js/plugins.js"></script>
<script src="<?php echo base_url(); ?>assets/js/scripts.js"></script>

</body>

<script
  src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js"
  integrity="sha256-eGE6blurk5sHj+rmkfsGYeKyZx3M4bG+ZlFyA7Kns7E="
  crossorigin="anonymous"></script>

<?php if(isset($generated_quote) && $generated_quote != ''){ ?>
<script>

    $(window).load(function(){
        data = <?php echo $generated_quote; ?>;
        populateQuoteData(data);
    });
</script>
<?php } ?>
</html>