<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Register.aspx.cs" Inherits="LAP.Register" %>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Signup Here - LCOM Affilliates Portal</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="" />
	<meta name="keywords" content="" />

	<!-- Styles -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" />
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="Content/CSS/style.css" />

	<link rel="stylesheet" type="text/css" href="Content/CSS/responsive.css" />
	<link rel="stylesheet" type="text/css" href="Content/CSS/color.css" />

    <link rel="stylesheet" type="text/css" href="Content/CSS/jquery-ui.min.css" />

    <script src="Scripts/jquery.min.js" type="text/javascript"></script>
    <script src="Scripts/Plugins/jqueryUI/jquery-ui.min.js" type="text/javascript"></script>

    <script src="Scripts/Plugins/devexpress/dxutility.js"></script>
    <script src="Scripts/global.js"></script>
    <script src="Scripts/lcom.js"></script>

    <style type="text/css">
        #divmessage {
            min-height: 25px;
            height: auto;
            width: 100%;
            position: relative;
            display: none;
            font-size: 16px;
            color: #FF0000;
            padding: 4px 0 0 5px;
            font-weight: bold;
            line-height: 20px;
            text-align: center;
        }
    </style>

</head>
<body>
    <form id="form1" runat="server">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="clsctrlregister">
                                <div class="login-page">
                                    <div class="login-form">
				                        <div class="login-left">
						                    <div class="login-logo"><img src="images/logo2.png" alt="" /> </div>
						                    <h4>We are <i>limousine.com</i></h4>
						                    <p>Welcome Back, Please login to your account.</p>
                                            <div id="divmessage"></div>
                                            <div class="login-credentials reg">
                                    <table border="0" style="width: 100%">
                                        <tr>
                                            <td style="width: 40%;" class="clslbltd">
                                                <label class="clslbl">Name</label>
                                            </td>
                                            <td style="width: 10%;">&nbsp;</td>
                                            <td style="width: 40%;" class="clslbltd">
                                                <label class="clslbl">Phone</label>
                                            </td>
                                            
                                        </tr>
                                        <tr>
                                             <td class="clstexttd">
                                                <asp:TextBox ID="txtUserName" runat="server" MaxLength="100" CssClass="clstext"></asp:TextBox>
                                            </td>
                                            <td></td>
                                            <td class="clstexttd">
                                                <asp:TextBox ID="txtUserPhone" runat="server" MaxLength="20" CssClass="clstext"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="clslbltd">
                                                <label class="clslbl">Email</label>
                                            </td>
                                             <td></td>
                                            <td class="clslbltd">
                                                <label class="clslbl">Company Name</label>
                                            </td>
                                            
                                        </tr>
                                        <tr>
                                            <td class="clstexttd">
                                                <asp:TextBox ID="txtUserEmail" runat="server" MaxLength="60" CssClass="clstext"></asp:TextBox>
                                            </td>
                                            <td></td>
                                            <td class="clstexttd">
                                                <asp:TextBox ID="txtCompanyName" runat="server" MaxLength="100" CssClass="clstext"></asp:TextBox>
                                            </td>

                                        </tr>
                                        <tr>
                                            <td class="clslbltd">
                                                <label class="clslbl">Company Phone</label>
                                            </td>
                                           <td></td>
                                            <td class="clslbltd">
                                                <label class="clslbl">Company Email</label>
                                            </td>
                                            
                                        </tr>
                                        <tr>
                                             <td class="clstexttd">
                                                <asp:TextBox ID="txtCompanyPhone" runat="server" MaxLength="20" CssClass="clstext"></asp:TextBox>
                                            </td>
                                            <td></td>
                                            <td class="clstexttd">
                                                <asp:TextBox ID="txtCompanyEmail" runat="server" MaxLength="60" CssClass="clstext"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="clslbltd">
                                                <label class="clslbl">Company Address</label>
                                            </td>
                                           <td></td>
                                            <td class="clslbltd">
                                                <label class="clslbl">State</label>
                                            </td>
                                            
                                        </tr>
                                        <tr>
                                             <td class="clstexttd">
                                                <asp:TextBox ID="txtCompanyAddress" runat="server" MaxLength="1000" CssClass="clstext"></asp:TextBox>
                                            </td>
                                            <td></td>
                                            <td class="clstexttd">
                                                <asp:TextBox ID="txtState" runat="server" MaxLength="50" CssClass="clstext"></asp:TextBox>
                                            </td>

                                        </tr>
                                        <tr>
                                            <td class="clslbltd">
                                                <label class="clslbl">City</label>
                                            </td>
                                            <td></td>
                                            <td class="clslbltd">
                                                <label class="clslbl">Country</label>
                                            </td>
                                            
                                        </tr>
                                        <tr>
                                            <td class="clstexttd">
                                                <asp:TextBox ID="txtCity" runat="server" MaxLength="50" CssClass="clstext"></asp:TextBox>
                                            </td>
                                            <td></td>
                                            <td class="clstexttd">
                                                <asp:TextBox ID="txtCountry" runat="server" MaxLength="50" CssClass="clstext"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="clslbltd" colspan="3">
                                                <label class="clslbl">Service Area</label>
                                            </td>
                                            
                                        </tr>
                                        <tr>
                                            <td class="clstexttd" colspan="3">
                                                <asp:TextBox ID="txtServiceArea" placeholder="" TextMode="MultiLine"
                                                    runat="server" CssClass="clstextarea" Rows="10" cols="10"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="clstexttd" colspan="3">
                                                <asp:Button ID="btnSend" runat="server" CssClass="custom-btn style3 rounded" OnClientClick="javascript:return VerifyPageInputs();" Text="Register Now" OnClick="btnSend_Click" />
                                                &nbsp;
                            					<a class="custom-btn style2 rounded" href="Default" title="">Login</a>

                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                            <p class="login-note">By Signing up, you agree to Limousine.com <br> <a href="#" title="">Terms and Conditions</a> & <a href="#" title="">Privacy Policy</a></p>
				                        </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>

    </form>
    <script type="text/javascript">
        var txtUserName = $('#<%=txtUserName.ClientID%>');
        var txtUserPhone = $('#<%=txtUserPhone.ClientID%>');
        var txtUserEmail = $('#<%=txtUserEmail.ClientID%>');
        var txtCompanyName = $('#<%=txtCompanyName.ClientID%>');
        var txtCompanyPhone = $('#<%=txtCompanyPhone.ClientID%>');
        var txtCompanyEmail = $('#<%=txtCompanyEmail.ClientID%>');
        var txtCompanyAddress = $('#<%=txtCompanyAddress.ClientID%>');
        var txtState = $('#<%=txtState.ClientID%>');
        var txtCity = $('#<%=txtCity.ClientID%>');
        var txtCountry = $('#<%=txtCountry.ClientID%>');
        var txtServiceArea = $('#<%=txtServiceArea.ClientID%>');

        function VerifyPageInputs() {
            RemoveSpaces('<%=txtUserName.ClientID%>');
            RemoveSpaces('<%=txtUserPhone.ClientID%>');
            RemoveSpaces('<%=txtUserEmail.ClientID%>');
        RemoveSpaces('<%=txtCompanyName.ClientID%>');
        RemoveSpaces('<%=txtCompanyPhone.ClientID%>');
        RemoveSpaces('<%=txtCompanyEmail.ClientID%>');
            RemoveSpaces('<%=txtCompanyAddress.ClientID%>');
            RemoveSpaces('<%=txtState.ClientID%>');
            RemoveSpaces('<%=txtCity.ClientID%>');
            RemoveSpaces('<%=txtCountry.ClientID%>');
            RemoveSpaces('<%=txtServiceArea.ClientID%>');

            if ($.trim($(txtUserName).val()) == "") {
                ShowMessage("Please enter your name.");
                window.setTimeout(function () { $(txtUserName).focus(); }, 0);
                return false;
            }

            if ($.trim($(txtUserPhone).val()) == "") {
                ShowMessage("Please enter your phone number.");
                window.setTimeout(function () { $(txtUserPhone).focus(); }, 0);
                return false;
            }
            if ($.trim($(txtUserEmail).val()) == "") {
                ShowMessage("Please enter your email address.");
                window.setTimeout(function () { $(txtUserEmail).focus(); }, 0);
                return false;
            }
            else {
                if ($.trim($(txtUserEmail).val()) == "" || $.trim($(txtUserEmail).val()).length < 3 || checkEmailAddress($.trim($(txtUserEmail).val())) == false) {
                    ShowMessage("Please enter a valid email address.");
                    window.setTimeout(function () { $(txtUserEmail).focus(); }, 0);
                    return false;
                }
            }

            if ($.trim($(txtCompanyName).val()) != "") {
                if (!isValidAlphaNumericWithSpecialCharacter($.trim($(txtCompanyName).val()))) {
                    ShowMessage("Company name contains invalid characters.");
                    window.setTimeout(function () { $(txtCompanyName).focus(); }, 0);
                    return false;
                }
            }

            if ($.trim($(txtCompanyPhone).val()) != "") {
                if (!isValidAlphaNumericWithSpecialCharacter($.trim($(txtCompanyPhone).val()))) {
                    ShowMessage("Company phone contains invalid characters.");
                    window.setTimeout(function () { $(txtCompanyPhone).focus(); }, 0);
                    return false;
                }
            }

            if ($.trim($(txtCompanyEmail).val()) != "") {
                if ($.trim($(txtCompanyEmail).val()) == "" || $.trim($(txtCompanyEmail).val()).length < 3 || checkEmailAddress($.trim($(txtCompanyEmail).val())) == false) {
                    ShowMessage("Please enter a valid company email address.");
                    window.setTimeout(function () { $(txtCompanyEmail).focus(); }, 0);
                    return false;
                }
            }

            if ($.trim($(txtCompanyAddress).val()) != "") {
                if (!isValidAlphaNumericWithSpecialCharacter($.trim($(txtCompanyAddress).val()))) {
                    ShowMessage("Company address contains invalid characters.");
                    window.setTimeout(function () { $(txtCompanyAddress).focus(); }, 0);
                    return false;
                }
            }

            if ($.trim($(txtState).val()) != "") {
                if (!isValidAlphaNumericWithSpecialCharacter($.trim($(txtState).val()))) {
                    ShowMessage("State contains invalid characters.");
                    window.setTimeout(function () { $(txtState).focus(); }, 0);
                    return false;
                }
            }

            if ($.trim($(txtCity).val()) != "") {
                if (!isValidAlphaNumericWithSpecialCharacter($.trim($(txtCity).val()))) {
                    ShowMessage("City contains invalid characters.");
                    window.setTimeout(function () { $(txtCity).focus(); }, 0);
                    return false;
                }
            }

            if ($.trim($(txtCountry).val()) != "") {
                if (!isValidAlphaNumericWithSpecialCharacter($.trim($(txtCountry).val()))) {
                    ShowMessage("Country contains invalid characters.");
                    window.setTimeout(function () { $(txtCountry).focus(); }, 0);
                    return false;
                }
            }

            if ($.trim($(txtServiceArea).val()) != "") {
                if ($.trim($(txtServiceArea).val().length) > 1000) {
                    ShowMessage("You cannot enter more than 1000 characters in service area field.");
                    window.setTimeout(function () { $(txtServiceArea).focus(); }, 0);
                    return false;
                }
                if (!isValidAlphaNumericWithSpecialCharacter($.trim($(txtServiceArea).val()))) {
                    ShowMessage("Service area contains invalid characters.");
                    window.setTimeout(function () { $(txtServiceArea).focus(); }, 0);
                    return false;
                }
            }


            return true;
        }

    </script>
    <style type="text/css">
        .clsctrlregister div {
            padding: 15px 50px;
        }

        .clsctrlregister .clslbltd {
        }

        .clsctrlregister .clstexttd {
            padding-bottom: 10px;
        }
    </style>
</body>
</html>
