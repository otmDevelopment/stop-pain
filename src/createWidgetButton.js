export const createWidgetButton = (city, clinic, doctor) => {


  DdWidget({
    widget: "Button",
    template: "Button_common",
    pid: "29374",
    id: "DDWidgetButton",
    container: "DDWidgetButton",
    action: "LoadWidget",
    city: city,
    clinicId: +clinic,
    doctorId: +doctor,
  });
};
