<div align="center">

# 🛒 FastFoodShop

Ứng dụng bán hàng trên mobile được phát triển bằng **React Native + Expo**, sử dụng **Firebase** cho hệ thống xác thực và lưu trữ dữ liệu, kết hợp **Cloudinary** để upload avatar người dùng.

<img src="https://img.shields.io/badge/React_Native-0.81.5-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/Expo-54.0.0-000020?style=for-the-badge&logo=expo&logoColor=white"/>
<img src="https://img.shields.io/badge/Firebase-Backend-FFCA28?style=for-the-badge&logo=firebase&logoColor=black"/>
<img src="https://img.shields.io/badge/Cloudinary-Image_Upload-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white"/>
<img src="https://img.shields.io/badge/Architecture-MVVM-7952B3?style=for-the-badge"/>

</div>

---

# 📬 Liên hệ

### 👤 Nguyễn Phước Nhân

* 📞 0943 777 242
* 📧 [nguyen.nhan6704@gmail.com](mailto:nguyen.nhan6704@gmail.com)

---

# ✨ Giới thiệu

**FastFoodShop** là ứng dụng bán hàng trên mobile được xây dựng bằng **React Native và Expo**.

Ứng dụng mô phỏng một quy trình mua hàng hoàn chỉnh, từ việc xem và tìm kiếm sản phẩm, xem thông tin chi tiết, quản lý giỏ hàng đến thanh toán và theo dõi đơn hàng.

Project được tổ chức theo mô hình **MVVM (Model - View - ViewModel)** nhằm tách biệt giao diện, business logic và dữ liệu, giúp code dễ quản lý và mở rộng hơn.

Ứng dụng cung cấp các chức năng chính:

* Đăng ký và đăng nhập tài khoản
* Xác thực email
* Quên và đặt lại mật khẩu
* Xem sản phẩm mới và sản phẩm nổi bật
* Tìm kiếm sản phẩm
* Xem chi tiết sản phẩm
* Thêm và quản lý sản phẩm trong giỏ hàng
* Tính giá sản phẩm và tổng tiền
* Thanh toán bằng COD
* Đặt hàng và lưu thông tin đơn hàng
* Xem lịch sử đơn hàng
* Xem chi tiết đơn hàng
* Quản lý thông tin cá nhân
* Cập nhật avatar người dùng

---

# 👨‍💻 Vai trò & đóng góp

## 👤 Nguyễn Phước Nhân

**Phụ trách toàn bộ dự án**

* Phân tích và xây dựng cấu trúc project
* Xây dựng giao diện ứng dụng
* Xây dựng hệ thống Authentication
* Xây dựng chức năng hiển thị và tìm kiếm sản phẩm
* Xây dựng Product Detail
* Xây dựng giỏ hàng
* Xây dựng quy trình Checkout
* Xây dựng hệ thống đơn hàng
* Xây dựng Profile và quản lý thông tin người dùng
* Tích hợp Firebase Authentication
* Tích hợp Cloud Firestore
* Tích hợp Cloudinary
* Tổ chức project theo mô hình MVVM
* Xây dựng hệ thống Navigation

---

# 🏗️ Architecture

Project được tổ chức theo mô hình **MVVM (Model - View - ViewModel)** kết hợp với các layer `Services` và `Navigation`.

Mô hình này giúp tách phần giao diện khỏi business logic và các thao tác với dữ liệu.

## 📦 Model

Chịu trách nhiệm định nghĩa cấu trúc dữ liệu được sử dụng trong ứng dụng.

Các model chính:

* `User`
* `Product`
* `Order`

## 🎨 View

Chứa toàn bộ giao diện người dùng và các màn hình của ứng dụng.

Bao gồm:

* Authentication
* Home
* Search
* Product Detail
* Cart
* Checkout
* Order
* Order Detail
* Profile
* Personal Information

## 🧠 ViewModel

Chịu trách nhiệm xử lý business logic và giao tiếp với dữ liệu.

Các ViewModel chính:

* `AuthViewModels`
* `ProductViewModel`
* `CartViewModels`
* `OrderViewModels`

## ☁️ Services

Chứa các service giao tiếp với các dịch vụ bên ngoài.

Hiện tại project sử dụng:

* `CloudinaryServices`
* Firebase Authentication
* Cloud Firestore

## 🧭 Navigation

Quản lý luồng điều hướng giữa các màn hình bằng **React Navigation**.

Bao gồm:

* Bottom Tab Navigation
* Stack Navigation

---

# 🚀 Tính năng chính

## 🔐 Authentication

Hệ thống xác thực người dùng được xây dựng bằng **Firebase Authentication**.

Chức năng:

* Đăng ký tài khoản bằng email và mật khẩu
* Đăng nhập
* Đăng xuất
* Xác thực email
* Quên mật khẩu
* Đặt lại mật khẩu
* Theo dõi trạng thái đăng nhập
* Kiểm tra trạng thái xác thực của tài khoản

---

## 👤 Hồ sơ cá nhân

Người dùng có thể xem và chỉnh sửa thông tin cá nhân.

Thông tin hỗ trợ:

* Username
* Email
* Số điện thoại
* Địa chỉ
* Giới tính
* Avatar

### 🖼️ Upload Avatar

Avatar được xử lý theo quy trình:

* Chọn ảnh từ thiết bị
* Crop ảnh
* Upload lên Cloudinary
* Lưu URL avatar vào dữ liệu người dùng

---

## 🏠 Trang chủ

Trang chủ hiển thị các sản phẩm được phân loại theo nhiều khu vực.

### ⭐ Sản phẩm nổi bật

* Hiển thị danh sách sản phẩm nổi bật
* Sử dụng carousel
* Sắp xếp theo rating
* Hiển thị sản phẩm có rating cao
* Có thể chọn sản phẩm để xem chi tiết

### 🆕 Sản phẩm mới

* Hiển thị các sản phẩm mới nhất
* Sắp xếp theo thời gian tạo
* Hiển thị sản phẩm theo danh sách ngang
* Có thể truy cập Product Detail

---

## 🔍 Tìm kiếm sản phẩm

Màn hình Search cho phép người dùng tìm kiếm sản phẩm theo tên.

Chức năng:

* Nhập từ khóa tìm kiếm
* Tìm kiếm theo tên sản phẩm
* Không phân biệt chữ hoa và chữ thường
* Hiển thị kết quả tìm kiếm
* Chọn sản phẩm để xem chi tiết

---

## 🛍️ Chi tiết sản phẩm

Màn hình Product Detail hiển thị thông tin chi tiết của sản phẩm:

* Hình ảnh
* Tên sản phẩm
* Danh mục
* Rating
* Số lượng đánh giá
* Giá gốc
* Phần trăm giảm giá
* Giá sau giảm
* Mô tả

Người dùng có thể:

* Tăng số lượng
* Giảm số lượng
* Thêm sản phẩm vào giỏ hàng

Giá sản phẩm được tính dựa trên giá gốc và phần trăm giảm giá.

---

## 🛒 Giỏ hàng

Giỏ hàng được quản lý theo từng tài khoản người dùng.

Chức năng:

* Xem danh sách sản phẩm
* Thêm sản phẩm
* Tăng số lượng
* Giảm số lượng
* Xóa sản phẩm
* Tự động cập nhật tổng tiền
* Chuyển sang Checkout

---

## 💳 Checkout

Màn hình Checkout cho phép người dùng kiểm tra lại thông tin trước khi đặt hàng.

Thông tin bao gồm:

* Danh sách sản phẩm
* Số lượng
* Địa chỉ giao hàng
* Số điện thoại
* Ghi chú
* Tạm tính
* Phí vận chuyển
* Tổng tiền

### 💰 Phương thức thanh toán

Hiện tại ứng dụng hỗ trợ:

* **COD - Thanh toán khi nhận hàng**

Sau khi đặt hàng thành công, thông tin đơn hàng được lưu lại và sản phẩm tương ứng được xử lý khỏi giỏ hàng.

---

## 📦 Đơn hàng

Hệ thống đơn hàng cho phép người dùng quản lý và theo dõi các đơn hàng đã đặt.

### Danh sách đơn hàng

Hiển thị:

* Mã đơn hàng
* Ngày đặt
* Trạng thái
* Số lượng sản phẩm
* Tổng tiền
* Phương thức thanh toán

Các đơn hàng được hiển thị theo tài khoản người dùng.

### Chi tiết đơn hàng

Hiển thị:

* Mã đơn hàng
* Ngày đặt
* Trạng thái
* Thông tin người nhận
* Số điện thoại
* Địa chỉ
* Ghi chú
* Danh sách sản phẩm
* Số lượng
* Tạm tính
* Phí vận chuyển
* Tổng thanh toán
* Phương thức thanh toán

---

## 👤 Profile

Màn hình Profile hiển thị thông tin cơ bản của tài khoản.

Người dùng có thể:

* Xem avatar
* Xem username
* Xem email
* Truy cập thông tin cá nhân
* Chỉnh sửa thông tin
* Xem đơn hàng

---

# 🧭 Navigation

Ứng dụng sử dụng **React Navigation** để quản lý các luồng điều hướng.

## Bottom Tab Navigation

| Tab        | Chức năng                        |
| ---------- | -------------------------------- |
| 🏠 Home    | Hiển thị sản phẩm mới và nổi bật |
| 🔍 Search  | Tìm kiếm sản phẩm                |
| 🛒 Cart    | Quản lý giỏ hàng                 |
| 👤 Profile | Quản lý tài khoản và đơn hàng    |

## Stack Navigation

| Screen                | Chức năng              |
| --------------------- | ---------------------- |
| `ProductDetailScreen` | Chi tiết sản phẩm      |
| `InformationScreen`   | Thông tin cá nhân      |
| `CheckoutScreen`      | Thanh toán và đặt hàng |
| `OrderScreen`         | Danh sách đơn hàng     |
| `OrderDetailScreen`   | Chi tiết đơn hàng      |

---

# 🛠️ Công nghệ sử dụng

| Công nghệ / Thư viện             | Vai trò                              |
| -------------------------------- | ------------------------------------ |
| React Native `0.81.5`            | Framework phát triển ứng dụng mobile |
| React `19.1.0`                   | Xây dựng giao diện người dùng        |
| Expo `54.0.0`                    | Môi trường phát triển React Native   |
| Firebase Authentication          | Xác thực và quản lý tài khoản        |
| Cloud Firestore                  | Lưu trữ dữ liệu ứng dụng             |
| Cloudinary                       | Upload và lưu trữ avatar             |
| React Navigation                 | Điều hướng giữa các màn hình         |
| React Native Reanimated `4.1.1`  | Animation                            |
| React Native Gesture Handler     | Xử lý gesture                        |
| React Native Safe Area Context   | Xử lý Safe Area                      |
| React Native Reanimated Carousel | Hiển thị carousel                    |
| Expo Image Picker                | Chọn hình ảnh từ thiết bị            |
| Expo Checkbox                    | Checkbox trong giao diện             |
| Expo Vector Icons                | Hệ thống icon                        |

---

# 📂 Cấu trúc thư mục

```text
.
├── index.js
├── App.js
├── app.json
├── firebaseConfig.js
├── package.json
├── yarn.lock
│
└── src/
    ├── models/
    │   ├── Order.js
    │   ├── Product.js
    │   └── User.js
    │
    ├── navigation/
    │   └── MainNavigator.js
    │
    ├── services/
    │   └── CloudinaryServices.js
    │
    ├── viewmodels/
    │   ├── AuthViewModels.js
    │   ├── CartViewModels.js
    │   ├── OrderViewModels.js
    │   └── ProductViewModel.js
    │
    └── views/
        ├── AuthScreen.js
        ├── CartScreen.js
        ├── CheckoutScreen.js
        ├── HomeScreen.js
        ├── InformationScreen.js
        ├── OrderDetailScreen.js
        ├── OrderScreen.js
        ├── ProductDetailScreen.js
        ├── ProfileScreen.js
        └── SearchScreen.js
```

---

# 🧩 Mô tả cấu trúc

| Thư mục / File      | Chức năng                                         |
| ------------------- | ------------------------------------------------- |
| `src/models/`       | Định nghĩa các model dữ liệu của ứng dụng         |
| `src/views/`        | Chứa giao diện và các màn hình chính              |
| `src/viewmodels/`   | Xử lý business logic và thao tác với dữ liệu      |
| `src/services/`     | Chứa các service giao tiếp với hệ thống bên ngoài |
| `src/navigation/`   | Cấu hình và quản lý điều hướng                    |
| `App.js`            | Khởi tạo ứng dụng và thiết lập luồng chính        |
| `index.js`          | Entry point của React Native / Expo               |
| `firebaseConfig.js` | Cấu hình Firebase                                 |
| `app.json`          | Cấu hình Expo                                     |
| `package.json`      | Quản lý dependencies và thông tin project         |
| `yarn.lock`         | Khóa phiên bản dependencies                       |

---

# 📱 Screenshots

## 🔐 Authentication

<div align="center">
<img width="200" height="455" alt="1788111628756_2074054842624746299_773088921620105033_4f0b548ae5010fdd9778d391cab1c5a0" src="https://github.com/user-attachments/assets/11294202-e504-4d61-856d-d9713d4a023f" />
<img width="200" height="455" alt="1788111628830_2074054842624746299_773088921620105033_c883a57f36dd3dac29c8341c249760b0" src="https://github.com/user-attachments/assets/6d54b3d3-58a3-4499-a687-9a5e5fe7a237" />
<img width="200" height="455" alt="1788111628926_2074054842624746299_773088921620105033_3d3b43a4c8d145593da8c9c04d67ebb4" src="https://github.com/user-attachments/assets/1b1a6495-c8ae-4c11-a57c-75a9c3e71d5a" />
</div>

## 🏠 Trang chủ

<div align="center">
<img width="200" height="455" alt="1788111629067_2074054842624746299_773088921620105033_cc45439afbeb908a7169c315ff186fbd" src="https://github.com/user-attachments/assets/8014b369-1e88-4845-bcf7-5aa6ef1c94c7" />
</div>

## 🔍 Tìm kiếm sản phẩm

<div align="center">
<img width="200" height="455" alt="1788111629153_2074054842624746299_773088921620105033_a2ec9c1eb4d53a6c28f2d00fc4caa481" src="https://github.com/user-attachments/assets/b0b7fd0e-aa9b-4125-8627-dfcd844cf19a" />
<img width="200" height="455" alt="1788111629242_2074054842624746299_773088921620105033_4a67eb0732d2f25e48c26dc78ad68e74" src="https://github.com/user-attachments/assets/2e106059-8573-4938-a0b7-d686b8c9c4cf" />

</div>

## 🛍️ Chi tiết sản phẩm

<div align="center">
<img width="200" height="455" alt="1788111629317_2074054842624746299_773088921620105033_8b1c36b148ec83c183f59e7694ca7114" src="https://github.com/user-attachments/assets/2c26ddbd-ab87-4754-bc2a-b13801a236f1" />
</div>

## 🛒 Giỏ hàng

<div align="center">
<img width="200" height="455" alt="1788111629448_2074054842624746299_773088921620105033_94c922a3d729a7c7a3c1a4602877a6e4" src="https://github.com/user-attachments/assets/3c08ee0d-ccbb-4c08-9f14-efcd6cc288e0" />
<img width="200" height="455" alt="1788111629626_2074054842624746299_773088921620105033_8d101a252c94a389c842a2f24555e282" src="https://github.com/user-attachments/assets/5ccc09ee-55d1-42c4-9fd1-0abd67140ac4" />
</div>

## 💳 Checkout

<div align="center">
<img width="200" height="455" alt="1788111629765_2074054842624746299_773088921620105033_e3a92987d1ece507986b12c818b26852" src="https://github.com/user-attachments/assets/845b5778-1fca-400e-b9ae-e5c7a6187f5c" />
</div>

## 📦 Đơn hàng

<div align="center">
<img width="200" height="455" alt="1788111629851_2074054842624746299_773088921620105033_afc5f380976895a591ca0b3da2c159fa" src="https://github.com/user-attachments/assets/a7f84bf8-10ab-4b79-b7d1-665af1186b7a" />
<img width="200" height="455" alt="1788111629977_2074054842624746299_773088921620105033_52a2101de0ad15106f676865eb867577" src="https://github.com/user-attachments/assets/1a47eb66-6823-4964-8d8e-96f0ff56706d" />
</div>

## 👤 Hồ sơ cá nhân

<div align="center">
<img width="200" height="455" alt="13" src="https://github.com/user-attachments/assets/5b9cadf9-183d-455e-80fe-260cd43ef7e9" />
<img width="200" height="455" alt="14" src="https://github.com/user-attachments/assets/bb1efd03-69b9-4e2b-9932-ab7626d0e346" />
<img width="200" height="455" alt="15" src="https://github.com/user-attachments/assets/70762fb6-f8ab-4873-91b4-1d2b70170e5b" />
</div>
