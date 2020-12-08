<!DOCTYPE html>
<html>
  <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
    />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="google" content="notranslate" />
    <META http-equiv="Expires" content="-1" />
    <META http-equiv="Pragma" content="no-cache" />
    <META http-equiv="Cache-Control" content="no-store" />

    <title>AIA</title>

    <link href="/docuviewer/css/font-awesome.min_200527.css" rel="stylesheet" />
    <link href="/docuviewer/css/common_200527.css" rel="stylesheet" />
    <link href="/docuviewer/css/bootstrap_200527.css" rel="stylesheet" />

    <link href="/docuviewer/docuviewer-essential_200527.css" rel="stylesheet" />
    <link href="/docuviewer/docuviewer_200527.css" rel="stylesheet" />

    <script>
      // 추가 S
      try {
        const getPathParam = (num, url) => {
          if (!url) url = location.pathname;
          const args = url.split("/");

          if (args.length != 7) return null;
          if (!args[num]) return "";
          return args[num];
        };

        const urlParams = new URLSearchParams(location.search);

        const protocol = window.location.protocol;
        const hostname = window.location.hostname;

        const UPDATE_READ_URL =
          protocol + "//" + hostname + "/PDF/로그및수정.do?";
        //const cmpCode = getPathParam("1");
        //const authType = getPathParam("2");
        //const svrCode = getPathParam("3");
        //const fileType = getPathParam("4");
        //const tplCode = getPathParam("5");
        //const fileName = getPathParam("6");
        const cmpCode = urlParams.get("cmpCode");
        const authType = urlParams.get("authType");
        const svrCode = urlParams.get("svrCode");
        const fileType = "";
        const tplCode = urlParams.get("contentid").split("/")[1];
        const fileName = urlParams.get("contentid").split("/")[2];

        if (fileName) {
          const params =
            "물리적PDF파일명=" +
            fileName +
            "&고객사코드=" +
            cmpCode +
            "&구분=" +
            authType +
            "&서버코드=" +
            svrCode +
            "&URL=" +
            window.location.href +
            "&사용자=down";
          const fetchURL = UPDATE_READ_URL + params;

          // PDF read check
          const xhr = new XMLHttpRequest();
          xhr.open("GET", fetchURL, true);
          xhr.onload = function () {};
          xhr.send(null);
        }
      } catch (error) {}

      // 추가 E
    </script>

    <%@include file="billpostviewerInclude.jsp" %>

    <style>
      .pageGroup {
        position: fixed;
        left: 50%;
        top: auto;
        bottom: 20px;
        transform: translateX(-50%);
      }

      .headerButton.zoomInBtn {
        position: absolute;
        left: auto;
        top: auto;
        right: 20px;
        bottom: 190px;
        width: 45px;
        height: 45px;
        opacity: 0.2;
      }

      .headerButton.zoomOutBtn {
        position: absolute;
        left: auto;
        top: auto;
        right: 20px;
        bottom: 135px;
        width: 45px;
        height: 45px;
        opacity: 0.2;
      }

      .headerButton.prePageBtn {
        position: absolute;
        left: 20px;
        top: auto;
        bottom: 8px;
        width: 70px;
        height: 70px;
        transform: translateY(-50%);
        opacity: 0.35;
      }

      .headerButton.nextPageBtn {
        position: absolute;
        left: auto;
        top: auto;
        bottom: 8px;
        right: 20px;
        width: 70px;
        height: 70px;
        transform: translateY(-50%);
        opacity: 0.35;
      }

      .headerButton.zoomInBtn:hover,
      .headerButton.zoomOutBtn:hover,
      .headerButton.prePageBtn:hover,
      .headerButton.nextPageBtn:hover {
        border: 0px solid transparent;
      }

      .headerButton.downloadBtn {
        left: 0px;
      }

      .headerButton.pageWidthFitBtn {
        left: 40px;
      }

      .zoomSelect {
        line-height: normal;
      }

      @media (max-width: 730px) {
        .headerButton.pageWidthFitBtn {
          left: 30px;
        }
      }

      @media (max-width: 590px) {
        .headerButton.pageWidthFitBtn {
          display: block;
        }

        .scaleSelect {
          left: 130px;
        }
      }

      @media (max-width: 470px) {
        .headerButton.pageWidthFitBtn {
          display: block;
        }

        .scaleSelect {
          left: 130px;
          width: 200px;
        }
      }
    </style>

    <script language="javascript">
      // 우클릭막기
      document.addEventListener("contextmenu", (event) =>
        event.preventDefault()
      );

      var ui = null;

      function docuViewerLoad() {
        "use strict";

        ui = new DocuViewerUI();

        // 환경설정
        var viewerConfig = Object.create(null);

        // callback 함수 설정
        viewerConfig.documentCallback = {
          // 문서가 정상적으로 열렸을 때..아직 화면은 업데이트 되지 않은 상태!
          onOpenSuccessCallback: ui.onOpenSuccessCallback.bind(ui),

          // 에러가 발생했을 경우
          onErrorCallback: onErrorCallback,

          // 문서에 암호가 걸려 있을 때.
          onPasswordRequiredCallback: onPasswordRequiredCallback,

          // 문서 다운로드 진행 상황
          onLoadingProgressChangedCallback: ui.onLoadingProgressChangedCallback.bind(
            ui
          ),

          // 화면에서 보고 있는 페이지가 변경되었을 때
          onPageChangedCallback: ui.onPageChangedCallback.bind(ui),

          // 확대/축소가 되었을 때
          onScaleChangedCallback: ui.onScaleChangedCallback.bind(ui),
        };

        // 화면 element 설정
        viewerConfig.viewerElement = {
          viewerContainer: document.getElementById("viewerContainer"),
          viewer: document.getElementById("viewer"),
        };

        // 초기 시작 옵션
        viewerConfig.runOptions = {
          // 초기 문서 열람 방향
          scrollModeOnLoad: ScrollMode.HORIZONTAL,

          // singlepage, multipage, ( default : multipage )
          viewModeOnLoad: "singlepage",
          //viewModeOnLoad: "multipage",

          // 초기 문서 배율
          defaultZoomValue: "page-width",
          //defaultZoomValue : "50",

          // 문서를 PDF 로 고정
          forceDocumentType: "pdf",

          // 백그라운드 다운로드
          enableBackgroundDownload: false,
          //enableBackgroundDownload : true,

          // 한번 요청에 다운받을 수 있는 바이트 수 (500k)
          //rangeChunkSize : 65535,
          rangeChunkSize: 131070,
          //rangeChunkSize : 196605,
          //rangeChunkSize : 512500,
          //rangeChunkSize : 10240000, // 10MB
          //rangeChunkSize : 8050000,
        };

        var btn = document.querySelector(".headerButton.downloadBtn");
        btn.addEventListener("click", function () {
          var a = document.getElementById("downloadbtn");

          const filePath = '<%=request.getParameter( "contentid" )%>';
          const pFileName = filePath.split("/");

          const cmpCode = '<%=request.getParameter( "cmpCode" )%>';

          a.href =
            "/docuviewer/download.jsp?cmpCode=" +
            cmpCode +
            "&filePath=" +
            filePath +
            ".pdf&pFileName=" +
            pFileName[pFileName.length - 1];
          a.click();
        });

        // Finger Swipe S
        document.addEventListener("touchstart", handleTouchStart, false);
        document.addEventListener("touchmove", handleTouchMove, false);

        var xDown = null;
        var yDown = null;

        function getTouches(evt) {
          return (
            evt.touches || // browser API
            evt.originalEvent.touches
          ); // jQuery
        }

        function handleTouchStart(evt) {
          evt.preventDefault();
          const firstTouch = getTouches(evt)[0];
          xDown = firstTouch.clientX;
          yDown = firstTouch.clientY;
        }

        function handleTouchMove(evt) {
          evt.preventDefault();
          if (!xDown || !yDown) {
            return;
          }

          var xUp = evt.touches[0].clientX;
          var yUp = evt.touches[0].clientY;

          var xDiff = xDown - xUp;
          var yDiff = yDown - yUp;
          //console.log("xDiff : " + xDiff);
          //console.log("yDiff : " + yDiff);

          const viewerSize = document.getElementById("viewerContainer");
          const pageSize = viewerSize.querySelector(".page");

          if (viewerSize.offsetWidth <= pageSize.offsetWidth) return false;

          if (Math.abs(xDiff) > Math.abs(yDiff)) {
            /*most significant*/
            if (xDiff > 0) {
              /* left swipe */
              //console.log("left swipe");
              if (
                document.querySelector(
                  ".headerButton.scrollHorizontalBtn.pushed"
                )
              ) {
                //console.log("가로모드");
                document.querySelector(".headerButton.nextPageBtn").click();
              } else {
                //console.log("세로모드");
              }
            } else {
              /* right swipe */
              //console.log("right swipe");
              if (
                document.querySelector(
                  ".headerButton.scrollHorizontalBtn.pushed"
                )
              ) {
                //console.log("가로모드");
                document.querySelector(".headerButton.prePageBtn").click();
              } else {
                //console.log("세로모드");
              }
            }
          } else {
            if (yDiff > 0) {
              /* up swipe */
              //console.log("up swipe");
              if (
                document.querySelector(
                  ".headerButton.scrollHorizontalBtn.pushed"
                )
              ) {
                //console.log("가로모드");
              } else {
                //console.log("세로모드");
                document.querySelector(".headerButton.nextPageBtn").click();
              }
            } else {
              /* down swipe */
              //console.log("down swipe");
              if (
                document.querySelector(
                  ".headerButton.scrollHorizontalBtn.pushed"
                )
              ) {
                //console.log("가로모드");
              } else {
                //console.log("세로모드");
                document.querySelector(".headerButton.prePageBtn").click();
              }
            }
          }
          /* reset values */
          xDown = null;
          yDown = null;
        }
        // Finger Swipe E

        /*
	btn = document.querySelector( ".headerButton.scrollVerticalBtn" );
	btn.classList.add( "hidden" );
	
	btn = document.querySelector( ".headerButton.scrollHorizontalBtn" );
	btn.classList.add( "hidden" );
	*/

        ui.open(
          "GET",
          "/docuviewer/docuviewersvr.jsp",
          "<%=request.getQueryString()%>",
          viewerConfig
        );
      }

      function onErrorCallback(data) {
        // 추가 S
        try {
          const protocol = window.location.protocol;
          const hostname = window.location.hostname;

          const getPathParam = (num, url) => {
            if (!url) url = location.pathname;
            const args = url.split("/");

            if (args.length != 7) return null;
            if (!args[num]) return "";
            return args[num];
          };

          const UPDATE_READ_URL =
            protocol + "//" + hostname + "/PDF/뷰어로그.do?";
          const cmpCode = getPathParam("1");
          const authType = getPathParam("2");
          const svrCode = getPathParam("3");
          const fileType = getPathParam("4");
          const tplCode = getPathParam("5");
          const fileName = getPathParam("6");

          if (fileName) {
            const params =
              "물리적PDF파일명=" +
              fileName +
              "&구분=" +
              (authType.indexOf("1") !== -1 ? "29" : "19") +
              "" +
              "&서버코드=" +
              svrCode +
              "&URL=" +
              window.location.href +
              "&사용자=down";
            const fetchURL = UPDATE_READ_URL + params;

            // PDF read check
            const xhr = new XMLHttpRequest();
            xhr.open("GET", fetchURL, true);
            xhr.onload = function () {};
            xhr.send(null);
          }
        } catch (error) {}
        // 추가 E

        location.href = "/html/HTTP404.html";
        $("#errorMessageBody").text(data.message);
        $("#errorMessageBody").addClass("alert-danger");
        $("#messageModal").modal({ backdrop: "static" });
      }

      function onPasswordRequiredCallback(updateCallback, reason) {
        reasonLocal = reason;
        // reason
        // 1: need input password
        // 2: wrong password

        if (reason == PasswordResponses.NEED_PASSWORD) {
          $("#openPasswordLabel").html(
            "본 문서는 고객정보보호를 위하여 암호화되어 있습니다.</br>보안PDF 비밀번호는 개인고객은 주민등록번호 앞 6자리, 법인고객은 사업자번호 앞 6자리 입니다.</br>비밀번호를 입력해주세요."
          );
        } else {
          $("#openPasswordLabel").text(
            "주민등록번호 앞 6자리, 법인고객은 사업자번호 앞 6자리가 틀립니다. 자릿수를 오입력 하였는지 확인하고 다시 시도해주세요"
          );
        }

        $("#passwordModal").modal({ backdrop: "static" });

        $("#passwordModal").on("shown.bs.modal", function () {
          $("#openPassword").focus();
        });

        $("#pwdSendPassword").click(function (e) {
          e.preventDefault();
          updateCallback($("#openPassword").val());
        });

        $("#pwdCancel").click(function () {
          updateCallback("");
        });
      }
    </script>
  </head>

  <body>
    <div id="entireContainer" class="entireContainer">
      <div class="header">
        <div class="mainButtonGroup" active="default">
          <div class="headerButton downloadBtn" title="원본파일 다운로드">
            <img
              class="headerButtonImage"
              src="/docuviewer/images/ico_download.svg"
              alt=""
            />
          </div>
          <div class="headerButton pageWidthFitBtn" title="페이지너비에 맞춤">
            <img
              class="headerButtonImage"
              src="/docuviewer/images/ico_fitwidth.svg"
              alt=""
            />
          </div>
          <div class="headerButton scrollVerticalBtn" title="세로 스크롤">
            <img
              class="headerButtonImage"
              src="/docuviewer/images/ico_scroll_vertical.svg"
              alt=""
            />
          </div>
          <div class="headerButton scrollHorizontalBtn" title="가로 스크롤">
            <img
              class="headerButtonImage"
              src="/docuviewer/images/ico_scroll_horizontal.svg"
              alt=""
            />
          </div>
          <div class="scaleSelect" title="확대/축소 배율">
            <select class="zoomSelect">
              <option value="auto">자동 맞춤</option>
              <option value="page-actual">실제 크기에 맞춤</option>
              <option value="page-fit">페이지높이에 맞춤</option>
              <option value="page-width">페이지너비에 맞춤</option>
              <option value="custom" hidden="false">111</option>
              <option value="0.5">50%</option>
              <option value="0.75">75%</option>
              <option value="1">100%</option>
              <option value="1.25">125%</option>
              <option value="1.5">150%</option>
              <option value="2">200%</option>
              <option value="3">300%</option>
              <option value="4">400%</option>
            </select>
          </div>
        </div>
        <!-- 페이지 그룹. 하단으로 보여야 해서 다로 독립 -->
        <div class="pageGroup hidden">
          <input type="text" id="currentpage" title="현재 페이지" />
          <span
            style="
              position: absolute;
              left: 70px;
              top: 4px;
              color: #fff;
              user-select: none;
            "
            >/</span
          >
          <input type="text" id="totalpage" title="전체 페이지" readonly />
        </div>
      </div>
      <div class="progress" id="progressbarWrapper">
        <div
          class="progress-bar"
          id="progressbar"
          role="progressbar"
          aria-valuenow="0"
          aria-valuemin="0"
          aria-valuemax="0"
          style="width: 0%"
        ></div>
      </div>
      <!-- body -->
      <div id="mainContainer" class="mainContainer">
        <div id="viewerContainer" class="viewerContainer sidebarNotOpen">
          <div id="viewer" class="pdfViewer"></div>
        </div>
      </div>
      <ul>
        <li>link text -index</li>
      </ul>
      <div class="headerButton prePageBtn" title="이전 페이지">
        <img
          class="headerButtonImage"
          src="/docuviewer/images/ico_prepage_horizontal.svg"
          alt=""
        />
      </div>
      <div class="headerButton nextPageBtn" title="다음 페이지">
        <img
          class="headerButtonImage"
          src="/docuviewer/images/ico_nextpage_horizontal.svg"
          alt=""
        />
      </div>
      <div class="headerButton zoomOutBtn" title="축소">
        <img
          class="headerButtonImage"
          src="/docuviewer/images/ico_zoomout.svg"
          alt=""
        />
      </div>
      <div class="headerButton zoomInBtn" title="확대">
        <img
          class="headerButtonImage"
          src="/docuviewer/images/ico_zoomin.svg"
          alt=""
        />
      </div>
      <div id="overlayContainer" class="overlayContainer hidden">
        <div id="printServiceOverlay" class="container hidden">
          <div class="dialog">
            <div class="row">
              <span data-l10n-id="print_progress_message"
                >Preparing document for printing…</span
              >
            </div>
            <div class="row">
              <progress value="0" max="100"></progress>
              <span
                data-l10n-id="print_progress_percent"
                data-l10n-args='{ "progress": 0 }'
                class="relative-progress"
                >0%</span
              >
            </div>
            <div class="buttonRow">
              <button id="printCancel" class="overlayButton">
                <span data-l10n-id="print_progress_close">Cancel</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="passwordModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <label for="openPassword" id="openPasswordLabel"></label>
              <input
                type="password"
                class="form-control"
                id="openPassword"
                placeholder="열기 암호를 입력하십시오"
                style="border: 1px solid #ced4da"
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                id="pwdSendPassword"
              >
                확 인
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                id="pwdCancel"
              >
                취 소
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="messageModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <div class="alert" id="errorMessageBody"></div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                닫 기
              </button>
            </div>
          </div>
        </div>
      </div>

      <!--
		<div id="passwordOverlay" class="container hidden">
				<div class="dialog">
					<div class="row">
						<p id="passwordText">PDF 파일을 열 수 있는 비밀번호를 입력하십시오</p>
					</div>
					<div class="row">
						<input type="password" id="password" class="toolbarField">
					</div>
					<div class="buttonRow">
						<button id="passwordSubmit" class="overlayButton"><span data-l10n-id="password_ok">확인</span></button>
						<button id="passwordCancel" class="overlayButton"><span data-l10n-id="password_cancel">취소</span></button>
					</div>
				</div>
		</div>
		<div id="messageOverlay" class="container hidden">
			<div class="dialog">
				<div class="row">
					<p id="messageText">에러메세지</p>
				</div>
				<div class="row">
					<span>&nbsp;</span>
				</div>
				<div class="buttonRow">
					<button id="messageClose" class="overlayButton">확인</button>
				</div>
			</div>
		</div>
		-->
    </div>
    <script>
      if (
        document.readyState === "interactive" ||
        document.readyState === "complete"
      ) {
        docuViewerLoad();
      } else {
        document.addEventListener("DOMContentLoaded", docuViewerLoad, true);
      }
    </script>
    <a
      id="downloadbtn"
      href="#"
      target="for_download"
      style="display: none; visibility: hidden"
    ></a>
    <iframe
      name="for_download"
      style="width: 0px; height: 0px; display: none; visibility: hidden"
    ></iframe>
  </body>
</html>
