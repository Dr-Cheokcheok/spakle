<%@ page language="java" contentType="text/html;
    charset=UTF-8" pageEncoding="UTF-8"%>
<%
    String userId = request.getParameter("userId");
    String password = request.getParameter("password");

    if(User.login(userId, password)) {
        session.setAttribute("userId", userId);
    }
    response.sendRedirect("/");
%>