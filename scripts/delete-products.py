import stripe

stripe.api_key = ""

def delete_products() -> str: 
    # print(stripe.app_info)
    for product in stripe.Product.list():
        try:
            stripe.Product.update(product, {"active": False})  
            print( f"Bye {product.name}" )
        except Exception as error:
            print(error)
    
delete_products()

print(f"products left: {len(stripe.Product.list())}")