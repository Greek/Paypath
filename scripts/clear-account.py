import stripe

stripe.api_key = "sk_test_51N2fxrKjtX7KwyfC2S3BEgr5psNSyV63V3mnKNmRbFIy3n9x8iCwbyqJ0vho64zTxI7kjhaKXH8SLdFJWyCO9uOf00r5mAHKT2"

def delete_accounts() -> str: 
    for account in stripe.Account.list():
        try:
            stripe.Account.delete(account.id)  
            print( f"Bye {account.id}" )
        except:
            pass
    
delete_accounts()

print(f"accounts left: {len(stripe.Account.list())}")