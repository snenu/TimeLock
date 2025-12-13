$body = @{
    message = "Test message"
    recipientType = "friend"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:3000/api/enhance" -Method POST -ContentType "application/json" -Body $body

Write-Host "✅ API Response:"
Write-Host ($response | ConvertTo-Json)
