import stripe

stripe.api_key = "sk_test_51LM1QMDJWMXKt75CJjuUtZaUY4SWsQUelLxfQlKBZfgk6XfA7Vn65zUjLscb8tZMtUJB6KluyxgcRo82op3stmG900xUpRUpYj"

def delete_products() -> str: 
    for product in stripe.Product.list():
        try:
            stripe.Product.update(product, {"active": False})  
            print( f"Bye {product.id}" )
        except Exception as error:
            print(error)
    
delete_products()

print(f"products left: {len(stripe.Product.list())}")