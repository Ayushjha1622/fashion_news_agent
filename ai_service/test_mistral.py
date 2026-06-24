from app.services.mistral_service import generate

response = generate(
    "Say hello in one sentence."
)

print(response)