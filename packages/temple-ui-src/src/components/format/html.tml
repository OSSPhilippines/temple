<script>
  import purify from 'dompurify';
  const { value } = this.props;
  const init = () => {
    this.innerHTML = purify.sanitize(value);
  }
</script>
<span mount=init></span>