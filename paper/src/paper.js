function init() {
  const 발송수량 = 1000;
  const 사이즈 = "E01";
  const 전단지장수 = "02";
  const 디자인제작 = "Y";

  const 상품 = {
    B0101: "접착형 192*260 1장",
    B0201: "접착형 A4(210*297) 1장",
    E0101: "봉투형 A4 1장",
    E0102: "봉투형 A4 2장",
    E0201: "봉투형 A3 1장",
    E0202: "봉투형 A3 2장",
    E0301: "봉투형 A2 1장",
  };

  let 용지비 = 0,
    봉투비 = 0,
    봉입비 = 0,
    주소출력비 = 0,
    추가비 = 0;

  let 계산에러 = false;

  // 용지비
  if (사이즈 == "B01" || 사이즈 == "B02" || 사이즈 == "E01") {
    용지비 = 35;
  } else if (사이즈 == "E02") {
    용지비 = 72;
  } else if (사이즈 == "E03") {
    용지비 = 154;
  } else {
    계산에러 = true;
  }

  // 봉투비
  if (사이즈 == "E01" || 사이즈 == "E02" || 사이즈 == "E03") {
    봉투비 = 18;
  }

  // 봉입비
  if (사이즈 == "B01" || 사이즈 == "B02") {
    봉입비 = 27;
  } else if (사이즈 == "E01") {
    봉입비 = 18;
  } else if (사이즈 == "E02") {
    봉입비 = 27;
  } else if (사이즈 == "E03") {
    봉입비 = 36;
  } else {
    계산에러 = true;
  }

  주소출력비 = 10;

  if (전단지장수 == "02") {
    if (사이즈 == "E01") {
      추가비 = 45;
    } else if (사이즈 == "E02") {
      추가비 = 91;
    }
  }

  let 제작비 = 용지비 + 봉투비 + 봉입비 + 주소출력비 + 추가비;
  let 총제작비 = 제작비 * 발송수량;

  console.log("총제작비 : " + 총제작비);

  let 총디자인비 = 0;
  if (디자인제작 == "Y") {
    if (사이즈 == "B01" || 사이즈 == "B02" || 사이즈 == "E01") {
      총디자인비 = 20000 * Number(전단지장수);
    } else if (사이즈 == "E02") {
      총디자인비 = 40000 * Number(전단지장수);
    } else if (사이즈 == "E03") {
      총디자인비 = 80000 * Number(전단지장수);
    } else {
      계산에러 = true;
    }
  }

  console.log("총디자인비 : " + 총디자인비);

  let DB이용료 = 0;
  let 총DB이용료 = DB이용료 * 발송수량;

  console.log("총DB이용료 : " + 총DB이용료);

  let 우편료 = 0;
  if (사이즈 == "B01") {
    우편료 = 175;
  } else if (사이즈 == "B02") {
    우편료 = 190;
  } else if (사이즈 == "E01") {
    우편료 = 190;
  } else if (사이즈 == "E02") {
    if (전단지장수 == "01") {
      우편료 = 190;
    } else if (전단지장수 == "02") {
      우편료 = 200;
    } else {
      계산에러 = true;
    }
  } else if (사이즈 == "E03") {
    우편료 = 200;
  } else {
    계산에러 = true;
  }

  let 총우편료 = 우편료 * 발송수량;

  console.log("총우편료 : " + 총우편료);

  console.log("계산에러 : " + 계산에러);
  if (!계산에러) {
    const 공급가액 = 총제작비 + 총디자인비 + 총DB이용료 + 총우편료;
    const 부가세 = 공급가액 * 0.1;
    let 공급대가 = 공급가액 + 부가세;
    공급대가 = Math.floor(공급대가 / 10) * 10; // 원단위절사
    console.log("공급가액 : " + 공급가액);
    console.log("부가세 : " + 부가세);
    console.log("공급대가 : " + 공급대가);
  }
}

init();
