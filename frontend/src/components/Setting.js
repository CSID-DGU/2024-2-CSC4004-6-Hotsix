import React from "react";
import "../styles/Setting.css";

function Setting() {
  return React.createElement(
    "div",
    { className: "settings-container" },
    React.createElement("h1", null, "설정"),
    React.createElement(
      "div",
      { className: "settings-box" },
      React.createElement(
        React.Fragment,
        null,
        React.createElement(
          "div",
          { className: "settings-group" },
          React.createElement("label", null, "테마"),
          React.createElement(
            "select",
            null,
            React.createElement("option", null, "기기"),
            React.createElement("option", null, "라이트"),
            React.createElement("option", null, "다크")
          )
        ),
        React.createElement("hr"),
        React.createElement(
          "div",
          { className: "settings-group" },
          React.createElement("label", null, "툴바 맞춤설정"),
          React.createElement("button", null, "수정")
        ),
        React.createElement("hr"),
        React.createElement(
          "div",
          { className: "settings-group" },
          React.createElement("label", null, "모드"),
          React.createElement("input", { type: "checkbox" })
        ),
        React.createElement("hr"),
        React.createElement(
          "div",
          { className: "settings-group" },
          React.createElement("label", null, "홈 버튼 표시"),
          React.createElement("input", { type: "checkbox", disabled: true })
        ),
        React.createElement("hr"),
        React.createElement(
          "div",
          { className: "settings-group" },
          React.createElement("label", null, "북마크바 표시"),
          React.createElement("input", { type: "checkbox", defaultChecked: true })
        ),
        React.createElement("hr"),
        React.createElement(
          "div",
          { className: "settings-group" },
          React.createElement("label", null, "측면 패널 위치"),
          React.createElement(
            "select",
            null,
            React.createElement("option", null, "오른쪽에 표시"),
            React.createElement("option", null, "왼쪽에 표시")
          )
        ),
        React.createElement("hr"),
        React.createElement(
          "div",
          { className: "settings-group" },
          React.createElement(
            "label",
            null,
            "탭에 마우스를 가져가면 나타나는 미리보기 카드"
          ),
          React.createElement("input", { type: "checkbox", defaultChecked: true })
        ),
        React.createElement("hr"),
        React.createElement(
          "div",
          { className: "settings-group" },
          React.createElement("label", null, "탭 미리보기 이미지 표시"),
          React.createElement("input", { type: "checkbox", defaultChecked: true })
        ),
        React.createElement("hr"),
        React.createElement(
          "div",
          { className: "settings-group" },
          React.createElement("label", null, "탭 메모리 사용량 표시"),
          React.createElement("input", { type: "checkbox", defaultChecked: true })
        ),
        React.createElement("hr"),
        React.createElement(
          "div",
          { className: "settings-group" },
          React.createElement("label", null, "글꼴 크기"),
          React.createElement(
            "select",
            null,
            React.createElement("option", null, "작게"),
            React.createElement("option", { selected: true }, "중간(권장)"),
            React.createElement("option", null, "크게")
          )
        ),
        React.createElement("hr"),
        React.createElement(
          "div",
          { className: "settings-group" },
          React.createElement("label", null, "페이지 확대/축소"),
          React.createElement("input", {
            type: "range",
            min: "50",
            max: "200",
            defaultValue: "100",
          }),
          React.createElement("span", null, "100%")
        )
      )
    )
  );
}

export default Setting;