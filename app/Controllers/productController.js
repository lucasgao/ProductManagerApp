
function ProductController($scope, $http) {

    //$scope.products = [{ productId: 1, productName: 'Sony', price: 100, category: 'Mobiles' }, { productId: 2, productName: 'Apple', price: 200, category: 'Mobile' }];


    $scope.isAddOrEditOrView = {status:false,isAdding:false,isEditing:false,isViewing:false};

    function init() {
        getProducts();
    }

    init();

    function getProducts() {


        $http.get('app/data.json').success(function (data) {
            $scope.products = data;
        }).error(function () { alert('error'); });

    }
    $scope.addNew = function () {
        $scope.isAddOrEditOrView.status = true;
        $scope.isAddOrEditOrView.isAdding = true;

    }

    $scope.saveProduct = function () {
        $scope.product.ProductId = 0;
        //$scope.products.push($scope.product);

        $http.post('app/data.json', $scope.product)
            .success(function () { alert('saved') }).
            error(function () { alert('error'); });


        getProducts();

        $scope.product = null;
        $scope.isAddOrEditOrView.status = false;
        $scope.isAddOrEditOrView.isAdding = false;
    }
    
    $scope.cancel = function () {
        $scope.isAddOrEditOrView.status = false;
        $scope.isAddOrEditOrView.isAdding = false;
        $scope.isAddOrEditOrView.isEditing = false;
        $scope.isAddOrEditOrView.isEditing = false;
        $scope.product = null;
    }


    $scope.editProduct = function (productId) {

        $scope.getProductById(productId);

        $scope.isAddOrEditOrView.status = true;
        $scope.isAddOrEditOrView.isEditing = true;
        $scope.isAddOrEditOrView.isAdding = false;
        $scope.isAddOrEditOrView.isViewing = false;
    }
    $scope.updateProduct = function () {

        $http.put('app/data.json', $scope.product)
            .success(function () { alert('Updated...') }).
            error(function () { alert('error'); });

        getProducts();
        $scope.product = null;
        $scope.isAddOrEditOrView.status = false;
        $scope.isAddOrEditOrView.isEditing = false;
        $scope.isAddOrEditOrView.isAdding = false;
        $scope.isAddOrEditOrView.isViewing = false;

    }

    $scope.deleteProduct = function (productId) {
        $http.delete('app/data.json/' + productId).success(function () {
            alert('deleted...');
        });

        getProducts();

        $scope.isAddOrEditOrView.status = false;
        $scope.isAddOrEditOrView.isEditing = false;
        $scope.isAddOrEditOrView.isAdding = false;
        $scope.isAddOrEditOrView.isViewing = false;
    }

    $scope.viewProduct = function (productId) {
        $scope.getProductById(productId);

        $scope.isAddOrEditOrView.status = true;
        $scope.isAddOrEditOrView.isAdding = false;
        $scope.isAddOrEditOrView.isEditing = false;
        $scope.isAddOrEditOrView.isViewing = true;
    }
    $scope.getProductById = function (productId) {
        
        $http.get('app/data.json/' + productId).success(function (data) {
            $scope.product = data;
        });
    }



}

productManagerApp.controller('ProductController', ProductController);
