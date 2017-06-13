#### nginx example to front ssl connection to angular2

This is a dummy test configuration example to front a secure (https)
or insecure (http) connection

- nginx secure/secure
  - nginx https/secure port 8990
  - application https/secure port 8991

- nginx secure/clear
  - nginx https/secure port 8880
  - application http/clear port 8881

```
    server {
        server_name example.com;
        listen 8990 ssl http2 default_server;
        listen [::]:8990 ssl http2 default_server;

        # SSL termination proxy to https config
        ssl on;
        ssl_certificate /etc/letsencrypt/live/example.com/cert.pem;
        ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
        ssl_dhparam /etc/nginx/ssl/dhparam.pem;
        location / {

          proxy_pass_header Authorization;
          proxy_http_version 1.1;
          proxy_pass https://example.com:8991;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;


          proxy_set_header Connection "";
          proxy_buffering off;
          client_max_body_size 0;
          proxy_read_timeout 36000s;
          proxy_redirect off;
          proxy_ssl_session_reuse off;
       }
    }


    server {
        server_name example.com;
        listen 8880 ssl http2 default_server;
        listen [::]:8880 ssl http2 default_server;

        # SSL termination proxy to http config
        ssl on;
        ssl_certificate /etc/letsencrypt/live/example.com/cert.pem;
        ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
        ssl_dhparam /etc/nginx/ssl/dhparam.pem;

        location / {
           proxy_pass_header Authorization;
           proxy_http_version 1.1;
           proxy_pass http://example.com:8881;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;

        }
    }
```
