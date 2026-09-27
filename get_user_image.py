import os

# Check if there is any file descriptor or process receiving uploads
# Or let's see how control-plane-api or nginx handles uploads
with open('/var/log/nginx/access.log') as f:
    lines = f.readlines()
    for l in lines[-20:]:
        print(l.strip())
