<script>
import { Html5QrcodeScanner } from "html5-qrcode";

export default {
  name: "qrcode",
  data() {
    let html5QrcodeScanner = "";
    return {
      html5QrcodeScanner,
    };
  },
  props: {
    qrbox: {
      type: Number,
      default: 250,
    },
    fps: {
      type: Number,
      default: 10,
    },
  },
  mounted() {
    const config = {
      fps: this.fps,
      qrbox: this.qrbox,
    };
    this.html5QrcodeScanner = new Html5QrcodeScanner(
      "qr-code-full-region",
      config
    );
  },
  methods: {
    onScanSuccess(decodedText, decodedResult) {
      this.$emit("resultScan", decodedText, decodedResult);
    },
    renderQrScanner() {
      this.html5QrcodeScanner.render(this.onScanSuccess);
    },
    closeQrScanner() {
      this.html5QrcodeScanner.clear();
    },
  },
};
</script>

<template>
  <div id="qr-code-full-region"></div>
</template>

<style scoped>
#qr-code-full-region {
  width: 800px;
  background-color: white;
  color: black;
  border: 1px solid black;
  border-radius: 10px;
  display: inline-block;
}
</style>
