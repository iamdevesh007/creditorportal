<form action="<?php echo base_url().'quotes/success_view/'.$data['lead_id']; ?>?lead_id=<?php echo $data['lead_id'];?>" id="PGForm" method="POST">
  <script
    src="https://checkout.razorpay.com/v1/checkout.js"
    data-key="<?php echo $data['key']?>"
    data-amount="<?php echo $data['amount']?>"
    data-currency="INR"
    data-name="<?php echo $data['name']?>"
    data-image="<?php echo $data['image']?>"
    data-description="<?php echo $data['description']?>"
    data-prefill.name="<?php echo $data['prefill']['name']?>"
    data-prefill.email="<?php echo $data['prefill']['email']?>"
    data-prefill.contact="<?php echo $data['prefill']['contact']?>"
    data-notes.shopping_order_id="3456"
    data-order_id="<?php echo $data['order_id']?>"
    data-modal="{ ondismiss: function() { console.log('ddd');history.go(-1); }, escape: true, backdropclose: false}"
    <?php if ($data['display_currency'] !== 'INR') { ?> data-display_amount="<?php echo $data['display_amount']?>" <?php } ?>
    <?php if ($data['display_currency'] !== 'INR') { ?> data-display_currency="<?php echo $data['display_currency']?>" <?php } ?>
  >
  </script>
  <!-- Any extra fields to be submitted with the form but not sent to Razorpay -->
  <input type="hidden" name="shopping_order_id" value="3456">
</form>
<script src="/assets/js/customer-portal/jquery.2.2.3.min.js"></script>

<script type="text/javascript">
  <?php unset($data['customer_id']);?>
$(document).ready(function(){
var options = <?php echo json_encode($data);?>;

 options.callback_url= "<?php echo base_url().'quotes/success_view/'.$data['lead_id']; ?>?lead_id=<?php echo $data['lead_id'];?>";
  
console.log(options)
  options.modal = {
    ondismiss: function() {

      window.location.href='<?php echo $prev_page;?>';
    },
    escape: true,
    backdropclose: false
};
var rzp = new Razorpay(options);

  $('.razorpay-payment-button').hide();
 // $('#PGForm').submit();
  rzp.open();
  $('#preloader').show();
})
</script>