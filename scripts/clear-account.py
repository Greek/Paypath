import stripe

stripe.api_key = ""

def delete_accounts() -> str: 
    for account in stripe.Account.list():
        try:
            stripe.Account.delete(account.id)  
            print( f"Bye {account.name}" )
        except:
            pass
    
delete_accounts()

print(f"accounts left: {len(stripe.Account.list())}")