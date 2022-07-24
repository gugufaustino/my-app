/**
 * Page User List
 */

"use strict";

function appUserList(objData) {
  // Datatable (jquery)
  $(function () {
    // Variable declaration for table
    var dt_user_table = $(".datatables-users"),
      select2 = $(".select2"),
      userEditView = "models/edit",
      userInsertView = "models/insert",
      statusObj = {
        1: { title: "Pending", class: "bg-label-warning" },
        2: { title: "Active", class: "bg-label-success" },
        3: { title: "Inactive", class: "bg-label-secondary" },
      };

    if (select2.length) {
      var $this = select2;
      $this.wrap('<div class="position-relative"></div>').select2({
        placeholder: "Select Country",
        dropdownParent: $this.parent(),
      });
    }
    // Users datatable
    if (dt_user_table.length) {
      var dt_user = dt_user_table.DataTable({
        // ajax: assetsPath + 'json/user-list.json', // JSON file to add data
        data: objData,
        columns: [
          // columns according to JSON
          { data: "id" },
          { data: "nome_completo" },
          { data: "idade", className : "text-center fw-semibold" },
          { data: "municipio", className : "text-capitalize" },
          { data: "situacao" },
          { data: "dthAtualizacao" , className : "text-center" },
          { data: "action" },
        ],
        columnDefs: [
          {
            // For Responsive
            targets: 0,
            className: "control",
            searchable: false,
            orderable: false,
            responsivePriority: 2,
            render: function (data, type, full, meta) {
              return "";
            },
          },
          {
            // User full name and email
            targets: 1,
            responsivePriority: 4,
            render: function (data, type, full, meta) {
              var $name = full["nome_completo"],
                $email = full["email"],
                $id = full["id"],
                $image = full["avatar"];
              if ($image) {
                // For Avatar image
                var $output = '<img data-href="' + userEditView + "/" + $id + '" src="' + $image + '" alt="Avatar" class="edit-record rounded-circle">';
              } else {
                // For Avatar badge
                var stateNum = Math.floor(Math.random() * 6);
                var states = [
                  "success",
                  "danger",
                  "warning",
                  "info",
                  "dark",
                  "primary",
                  "secondary",
                ];
                var $state = states[stateNum],
                  $name = full["nome_completo"],
                  $initials = $name.match(/\b\w/g) || [];
                $initials = (
                  ($initials.shift() || "") + ($initials.pop() || "")
                ).toUpperCase();
                $output =
                  '<span class="avatar-initial rounded-circle bg-label-' +
                  $state +
                  '">' +
                  $initials +
                  "</span>";
              }
              // Creates full output for row
              var $row_output =
                '<div class="d-flex justify-content-start align-items-center user-name">' +
                '<div class="avatar-wrapper">' +
                '<div class="avatar avatar-sm me-3">' +
                $output +
                "</div>" +
                "</div>" +
                '<div class="d-flex flex-column">' +
                '<a data-href="' + userEditView + "/" + $id + '" class="edit-record text-body text-truncate"><span class="fw-semibold">' +
                $name +
                "</span></a>" +
                '<small class="text-muted">' +
                $email +
                "</small>" +
                "</div>" +
                "</div>";
              return $row_output;
            },
          },


          {
            // situacao
            targets: 4,
            className: "text-center",
            render: function (data, type, full, meta) {
              var $status = full["situacao"];
              return ('<span class="badge ' + statusObj[$status].class + '">' +  full["situacaoNome"] +  "</span>" );
            },
          },
          {
            // Actions
            targets: -1,
            className: "text-center",

            searchable: false,
            orderable: false,
            render: function (data, type, full, meta) {
              return (
                '<div class="d-inline-block text-nowrap">' +
                // '<button class="btn btn-sm btn-icon"><i class="bx bx-edit"></i></button>' +
                '&nbsp; <button class="btn btn-sm btn-icon delete-record" data-id="' + full["id"] + '"><i class="bx bx-trash"></i></button>' +
                // '<button class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></button>' +
                // '<div class="dropdown-menu dropdown-menu-end m-0">' +
                //   '<a href="' +
                //   userEditView +
                //   '" class="dropdown-item">Ver Perfil</a>' +
                //   '<a href="javascript:;" class="dropdown-item">Ativar</a>' +
                //   '<a href="javascript:;" class="dropdown-item">Desativar</a>' +
                // "</div>" +
                "</div>"
              );
            },
          },
        ],
        order: [[1, "desc"]],
        dom:
          '<"row mx-2"' +
          '<"col-md-5"<"container-filter text-xl-end text-lg-start text-md-end text-start  align-items-center justify-content-end  mb-3 mb-md-0"f>>' +
          '<"col-md-7"<"container-btn dt-action-buttons dataTables_filter text-xl-end text-lg-start text-md-end text-start   align-items-center justify-content-end  mb-3 mb-md-0"B>>' +
          ">t" +
          '<"row mx-2"' +
          '<"col-sm-12 col-md-1"<"me-3"l>>' +
          '<"col-sm-12 col-md-6 ps-0"i>' +
          '<"col-sm-12 col-md-5"p>' +
          ">",
        language: datatables_ptBr,
        // Buttons with Dropdown
        buttons: [
          //Add-New
          {
            text:
              '<i class="bx bx-plus me-1"></i><span class="d-none d-lg-inline-block">Inserir</span>',
            className: "add-new btn btn-primary ps-3",
            attr: {
              // 'data-bs-toggle': 'offcanvas',
              // 'data-bs-target': '#offcanvasAddUser'
              id: "btnInserir",
            },
          },

          //Export
          {
            extend: "collection",
            className: "btn btn-label-secondary dropdown-toggle mx-3 me-0",
            text: '<i class="bx bx-upload me-2"></i>Exportar',
            buttons: [
              {
                extend: "print",
                text: '<i class="bx bx-printer me-2" ></i>Imprimir',
                className: "dropdown-item",
                exportOptions: {
                  columns: [1, 2, 3, 4, 5],
                  // prevent avatar to be print
                  format: {
                    body: function (inner, coldex, rowdex) {
                      if (inner.length <= 0) return inner;
                      var el = $.parseHTML(inner);
                      var result = "";
                      $.each(el, function (index, item) {
                        if (
                          item.classList !== undefined &&
                          item.classList.contains("user-name")
                        ) {
                          result =
                            result + item.lastChild.firstChild.textContent;
                        } else if (item.innerText === undefined) {
                          result = result + item.textContent;
                        } else result = result + item.innerText;
                      });
                      return result;
                    },
                  },
                },
                customize: function (win) {
                  //customize print view for dark
                  $(win.document.body)
                    .css("color", config.colors.headingColor)
                    .css("border-color", config.colors.borderColor)
                    .css("background-color", config.colors.body);
                  $(win.document.body)
                    .find("table")
                    .addClass("compact")
                    .css("color", "inherit")
                    .css("border-color", "inherit")
                    .css("background-color", "inherit");
                },
              },
              {
                extend: "csv",
                text: '<i class="bx bx-file me-2" ></i>Csv',
                className: "dropdown-item",
                exportOptions: {
                  columns: [1, 2, 3, 4, 5],
                  // prevent avatar to be display
                  format: {
                    body: function (inner, coldex, rowdex) {
                      if (inner.length <= 0) return inner;
                      var el = $.parseHTML(inner);
                      var result = "";
                      $.each(el, function (index, item) {
                        if (
                          item.classList !== undefined &&
                          item.classList.contains("user-name")
                        ) {
                          result =
                            result + item.lastChild.firstChild.textContent;
                        } else if (item.innerText === undefined) {
                          result = result + item.textContent;
                        } else result = result + item.innerText;
                      });
                      return result;
                    },
                  },
                },
              },
              {
                extend: "excel",
                text: "Excel",
                className: "dropdown-item",
                exportOptions: {
                  columns: [1, 2, 3, 4, 5],
                  // prevent avatar to be display
                  format: {
                    body: function (inner, coldex, rowdex) {
                      if (inner.length <= 0) return inner;
                      var el = $.parseHTML(inner);
                      var result = "";
                      $.each(el, function (index, item) {
                        if (
                          item.classList !== undefined &&
                          item.classList.contains("user-name")
                        ) {
                          result =
                            result + item.lastChild.firstChild.textContent;
                        } else if (item.innerText === undefined) {
                          result = result + item.textContent;
                        } else result = result + item.innerText;
                      });
                      return result;
                    },
                  },
                },
              },
              {
                extend: "pdf",
                text: '<i class="bx bxs-file-pdf me-2"></i>PDF',
                className: "dropdown-item",
                exportOptions: {
                  columns: [1, 2, 3, 4, 5],
                  // prevent avatar to be display
                  format: {
                    body: function (inner, coldex, rowdex) {
                      if (inner.length <= 0) return inner;
                      var el = $.parseHTML(inner);
                      var result = "";
                      $.each(el, function (index, item) {
                        if (
                          item.classList !== undefined &&
                          item.classList.contains("user-name")
                        ) {
                          result =
                            result + item.lastChild.firstChild.textContent;
                        } else if (item.innerText === undefined) {
                          result = result + item.textContent;
                        } else result = result + item.innerText;
                      });
                      return result;
                    },
                  },
                },
              },
              {
                extend: "copy",
                text: '<i class="bx bx-copy me-2" ></i>Copiar',
                className: "dropdown-item",
                exportOptions: {
                  columns: [1, 2, 3, 4, 5],
                  // prevent avatar to be display
                  format: {
                    body: function (inner, coldex, rowdex) {
                      if (inner.length <= 0) return inner;
                      var el = $.parseHTML(inner);
                      var result = "";
                      $.each(el, function (index, item) {
                        if (
                          item.classList !== undefined &&
                          item.classList.contains("user-name")
                        ) {
                          result =
                            result + item.lastChild.firstChild.textContent;
                        } else if (item.innerText === undefined) {
                          result = result + item.textContent;
                        } else result = result + item.innerText;
                      });
                      return result;
                    },
                  },
                },
              },
            ],
          },
        ],
        // For responsive popup
        responsive: {
          details: {
            display: $.fn.dataTable.Responsive.display.modal({
              header: function (row) {
                var data = row.data();
                return "Details of " + data["nome_completo"];
              },
            }),
            type: "column",
            renderer: function (api, rowIdx, columns) {
              var data = $.map(columns, function (col, i) {
                return col.title !== "" // ? Do not show row in modal popup if title is blank (for check box)
                  ? '<tr data-dt-row="' +
                      col.rowIndex +
                      '" data-dt-column="' +
                      col.columnIndex +
                      '">' +
                      "<td>" +
                      col.title +
                      ":" +
                      "</td> " +
                      "<td>" +
                      col.data +
                      "</td>" +
                      "</tr>"
                  : "";
              }).join("");

              return data
                ? $('<table class="table"/><tbody />').append(data)
                : false;
            },
          },
        },
        //// FILTROS ESTÃO ESCONDIDOS
        // initComplete: function () {
        //   // Adding role filter once table initialized
        //   this.api()
        //     .columns(2)
        //     .every(function () {
        //       var column = this;
        //       var select = $(
        //         '<select id="UserRole" class="form-select text-capitalize"><option value=""> Select Role </option></select>'
        //       )
        //         .appendTo('.user_role')
        //         .on('change', function () {
        //           var val = $.fn.dataTable.util.escapeRegex($(this).val());
        //           column.search(val ? '^' + val + '$' : '', true, false).draw();
        //         });

        //       column
        //         .data()
        //         .unique()
        //         .sort()
        //         .each(function (d, j) {
        //           select.append('<option value="' + d + '">' + d + '</option>');
        //         });
        //     });
        //   // Adding plan filter once table initialized
        //   this.api()
        //     .columns(3)
        //     .every(function () {
        //       var column = this;
        //       var select = $(
        //         '<select id="UserPlan" class="form-select text-capitalize"><option value=""> Select Plan </option></select>'
        //       )
        //         .appendTo('.user_plan')
        //         .on('change', function () {
        //           var val = $.fn.dataTable.util.escapeRegex($(this).val());
        //           column.search(val ? '^' + val + '$' : '', true, false).draw();
        //         });

        //       column
        //         .data()
        //         .unique()
        //         .sort()
        //         .each(function (d, j) {
        //           select.append('<option value="' + d + '">' + d + '</option>');
        //         });
        //     });
        //   // Adding status filter once table initialized
        //   this.api()
        //     .columns(3)
        //     .every(function () {
        //       var column = this;
        //       var select = $(
        //         '<select id="FilterTransaction" class="form-select text-capitalize"><option value=""> Select Status </option></select>'
        //       )
        //         .appendTo('.user_status')
        //         .on('change', function () {
        //           var val = $.fn.dataTable.util.escapeRegex($(this).val());
        //           column.search(val ? '^' + val + '$' : '', true, false).draw();
        //         });

        //       column
        //         .data()
        //         .unique()
        //         .sort()
        //         .each(function (d, j) {
        //           select.append(
        //             '<option value="' +  statusObj[d].title + '" class="text-capitalize">' +
        //               statusObj[d].title +
        //               '</option>'
        //           );
        //         });
        //     });
        // }
      });
    }

    // Delete Record
    $(".datatables-users tbody").on("click", ".delete-record", function () {
      let objRef = $(this);
      deleteModel(objRef.data("id"), function () {
        //console.log("callback sucess", );
        dt_user.row($(objRef).parents("tr")).remove().draw();
      });
    });

    // Filter form control to default size
    // ? setTimeout used for multilingual table initialization
    setTimeout(() => {
      $(".dataTables_filter .form-control").removeClass("form-control-sm");
      $(".dataTables_length .form-select").removeClass("form-select-sm");
    }, 0);

    button = document.getElementById("btnInserir");
    button.addEventListener("click", (event) => {
      navegateModel("models/insert");
    });

    $(".datatables-users tbody").on("click", ".edit-record", function () {
      navegateModel($(this).data("href"));
    });

  });

  validationForm();
}

// Validation & Phone mask
validationForm = function () {
  const phoneMaskList = document.querySelectorAll(".phone-mask"),
    addNewUserForm = document.getElementById("addNewUserForm");

  // Phone Number
  if (phoneMaskList) {
    phoneMaskList.forEach(function (phoneMask) {
      new Cleave(phoneMask, {
        phone: true,
        phoneRegionCode: "US",
      });
    });
  }
  // Add New User Form Validation
  const fv = FormValidation.formValidation(addNewUserForm, {
    fields: {
      userFullname: {
        validators: {
          notEmpty: {
            message: "Please enter fullname ",
          },
        },
      },
      userEmail: {
        validators: {
          notEmpty: {
            message: "Please enter your email",
          },
          emailAddress: {
            message: "The value is not a valid email address",
          },
        },
      },
    },
    plugins: {
      trigger: new FormValidation.plugins.Trigger(),
      bootstrap5: new FormValidation.plugins.Bootstrap5({
        // Use this for enabling/changing valid/invalid class
        eleValidClass: "",
        rowSelector: function (field, ele) {
          // field is the field name & ele is the field element
          return ".mb-3";
        },
      }),
      submitButton: new FormValidation.plugins.SubmitButton(),
      // Submit the form when all fields are valid
      // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
      autoFocus: new FormValidation.plugins.AutoFocus(),
    },
  });
};

function deleteModel(id, fncallbackSucess) {
  window.angularComponentReference.zone.run(() => {
      window.angularComponentReference.callNgDeleteModel(id, fncallbackSucess);
  });
}
function navegateModel(url) {
  window.angularComponentReference.zone.run(() => {
      window.angularComponentReference.callNgNavegate(url);
  });
}
