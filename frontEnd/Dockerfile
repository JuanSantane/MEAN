FROM nginx:alpine
ENV NODE_ENV production
COPY angularProject/dist/ /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]