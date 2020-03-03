<template>
  <footer class="pc-footer">
    <section class="pc-footer-content">
      <st-row
        class="pc-footer-top"
        justify="between"
      >
        <div class="footer-top-left">
          <div>
            <img
              src="../../assets/img/logo.png"
              class="width-760-min footer-logo"
            />
            <img
              src="../../assets/img/logo.png"
              class="width-760-max footer-logo"
            />
          </div>
          <p>{{$t('footer.webDesc')}}</p>
        </div>
        <div class="footer-top-middle">
          <dl>
            <dt>{{$t('footer.footer_1')}}</dt>
            <!-- <dd><a
                :href="intl.get('footer.footer_1_1_url')"
                target="_blank"
              >{{$t('footer.footer_1_1')}}</a></dd> -->
            <dd><a
                :href="$t('footer.footer_1_2_url')"
                target="_blank"
              >{{$t('footer.footer_1_2')}}</a></dd>
            <dd><a
                :href="$t('footer.footer_1_3_url')"
                target="_blank"
              >{{$t('footer.footer_1_3')}}</a></dd>
            <dd><a
                :href="$t('footer.footer_1_4_url')"
                target="_blank"
              >{{$t('footer.footer_1_4')}}</a></dd>
            <!-- <dd><a
                :href="intl.get('footer.footer_1_5_url')"
                target="_blank"
              >{{$t('footer.footer_1_5')}}</a></dd> -->
          </dl>
          <dl>
            <dt>{{$t('footer.footer_2')}}</dt>
            <dd><a
                :href="$t('footer.footer_2_1_url')"
                target="_blank"
              >{{$t('footer.footer_2_1')}}</a></dd>
            <!-- <dd><a
                :href="$t('footer.footer_2_2_url')"
                target="_blank"
              >{{$t('footer.footer_2_2')}}</a></dd> -->
            <dd><a
                :href="$t('footer.footer_2_3_url')"
                target="_blank"
              >{{$t('footer.footer_2_3')}}</a></dd>
          </dl>
          <dl>
            <dt>{{$t('footer.footer_3')}}</dt>
            <dd><a
                :href="$t('footer.footer_3_1_url')"
                target="_blank"
              >{{$t('footer.footer_3_1')}}</a></dd>
            <dd><a
                :href="$t('footer.footer_3_2_url')"
                target="_blank"
              >{{$t('footer.footer_3_2')}}</a></dd>
            <dd><a
                :href="$t('footer.footer_3_3_url')"
                target="_blank"
              >{{$t('footer.footer_3_3')}}</a></dd>
          </dl>
        </div>
        <div class="footer-top-right">
          <div class="contact-us">
            {{ $t('footer.contactUs') }}
          </div>
          <!-- <p class="lx">
            {{ $t('footer.kf') }}
            <span>
              <img src="../../assets/img/footer/icon-wechat.svg" alt="icon-wechat">
              <img src="../../assets/img/footer/kf-wx.jpg" alt="kf-wx">
            </span>
          </p> -->
          <p class="lx">
            <!-- {{ $t('footer.sw') }} -->serviece@tigermex.com
          </p>
        </div>
      </st-row>
    </section>
  </footer>
</template>
<script>
export default {
  name: "common-footer",
  computed: {
    locale() {
      return this.$store.state.auth.locale;
    }
  },
  methods: {}
};
</script>
<style lang="less" scoped>
@import "../../assets/css/base";

.pc-footer {
  // display: none;
  width: 100%;
  height: 265px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  min-width: 1200px;
  background: @L2;
  // padding-bottom: 40px;
  .width-760-max {
    display: none;
  }
  .pc-footer-content {
    // width: 1200px;
    margin: 0 32px;
    color: @L6;
    font-size: 12px;
    .pc-footer-top {
      padding-top: 60px;
      .footer-logo {
        width: 80px;
      }
      .footer-top-left {
        // width: 344px;
        // float: left;
        flex: 1;
        p {
          // padding-left: 10px;
          padding-right: 15px;
          padding-top: 10px;
          font-weight: 400;
          margin-bottom: 0px;
        }
      }
      .footer-top-middle {
        // width: 520px;
        // float: left;
        flex: 2;
        dl {
          width: 33%;
          float: left;
          dt {
            color: @L9;
            font-size: 14px;
          }
          dd,
          dt {
            padding: 5px 0px;
            a {
              color: @L6;
              font-weight: 400;
            }
          }
        }
      }
      .footer-top-right {
        width: 300px;
        // float: right;
        .lx {
          padding: 5px 0;
          font-weight: 400;
          span {
            position: relative;
            img {
              &:first-child {
                width: 20px;
                height: 20px;
                margin-left: 5px;
              }
              &:last-child {
                display: none;
                width: 80px;
                height: 80px;
                position: absolute;
                z-index: 1000;
                left: -23px;
                top: 25px;
              }
            }
            &:hover {
              img:last-child {
                display: block;
              }
            }
          }
        }
        .contact-us {
          color: @L6;
          font-size: 14px;
          padding: 5px 0px;
        }
        ul {
          padding-top: 10px;
          li {
            display: inline-block;
            font-size: 0;
            padding-right: 20px;
            position: relative;
            img {
              width: 32px;
              height: 32px;
            }
            a {
              .wechat-code {
                display: none;
                width: 80px;
                height: 80px;
                position: absolute;
                left: -21px;
                top: 36px;
              }
              &:hover {
                .wechat-code {
                  display: block;
                }
              }
            }
          }
        }
        .weixin-box {
          width: 100%;
          padding-top: 10px;
          padding-bottom: 20px;
          .weixin {
            width: 74px;
            //height: 86px;
            //background: #272d40;
            //border: 1px solid #344260;
            padding: 0px 4px;
            img {
              width: 100%;
              cursor: pointer;
            }
            p {
              padding-top: 2px;
              text-align: center;
              margin-bottom: 0px;
            }
          }
        }
      }
    }
    .pc-footer-middle {
      border-top: 1px solid #272d40;
      padding-top: 30px;
      padding-bottom: 30px;
      > span {
        padding-right: 10px;
      }
      > a {
        padding-right: 10px;
        color: @L6;
      }
    }
    .pc-footer-bottom {
      height: 30px;
      padding-top: 14px;
      //text-align: center;
      border-top: 1px solid #272d40;
    }
  }
}
@media screen and (max-width: 750px) {
  .pc-footer {
    min-width: 100%;
    height: 640px;
    padding-bottom: 15px;
    padding-top: 20px;
    .width-760-max {
      display: block;
    }
    .width-760-min {
      display: none;
    }
    .pc-footer-content {
      margin: 0;
      padding: 0px 20px;
      color: @L6;
      font-size: 12px;
      .pc-footer-top {
        padding-top: 0px;
        display: block;
        .footer-logo {
          width: 70px;
        }
        .footer-top-left {
          p {
            padding-left: 10px;
            padding-right: 15px;
            padding-top: 10px;
          }
        }
        .footer-top-middle {
          dl {
            width: 100%;
            float: none;
            dt {
              color: @L6;
              font-size: 14px;
            }
            dd,
            dt {
              padding: 5px 0px;
              margin-bottom: 0px;
              a {
                color: @L6;
              }
            }
            dd {
              display: inline-block;
              margin-right: 20px;
            }
          }
        }
        .footer-top-right {
          .contact-us {
            color: @L6;
            font-size: 14px;
            padding: 5px 0px;
          }
          p {
            padding: 5px 0px;
          }
          ul {
            padding-top: 10px;
            li {
              display: inline-block;
              font-size: 0;
              padding-right: 20px;
              position: relative;
              img {
                width: 32px;
                height: 32px;
              }
              a {
                .wechat-code {
                  display: none;
                  width: 80px;
                  height: 80px;
                  position: absolute;
                  left: -21px;
                  top: 36px;
                }
                &:hover {
                  .wechat-code {
                    display: block;
                  }
                }
              }
            }
          }
          .weixin-box {
            width: 100%;
            padding-top: 10px;
            padding-bottom: 20px;
            .weixin {
              width: 74px;
              padding: 0px 4px;
              img {
                width: 100%;
                cursor: pointer;
              }
              p {
                padding-top: 2px;
                text-align: center;
                margin-bottom: 0px;
              }
            }
          }
        }
      }
      .pc-footer-middle {
        max-width: 100%;
        word-wrap: break-word;
        border-top: 1px solid #272d40;
        padding: 20px 0;
        // padding-bottom: 30px;
        > span {
          padding-right: 10px;
        }
        > a {
          padding-right: 10px;
          color: @L6;
        }
      }
      .pc-footer-bottom {
        height: 30px;
        padding-top: 14px;
        border-top: 1px solid #272d40;
      }
    }
  }
}
@media screen and (max-width: 420px) {
  .pc-footer {
    height: 760px;
  }
}
</style>
