Folder features chứa các file code chức năng của trang web. 

Các file code của 1 chức năng cùng nằm trong 1 folder với cây thư mục như sau:
```
├── features
│   ├── authentication
│   │   ├── components
|   |   |   ├── ...
|   |   ├── hooks
|   |   |   ├── ...
|   |   ├── services
|   |   |   ├── ...
|   |   ├── index.js
|   ├── ...
```
- File index.js sẽ export các function component & method được dùng cho các page.
- Các folder con trong folder chức năng chứa các file code chỉ được dùng cho chức năng đó.