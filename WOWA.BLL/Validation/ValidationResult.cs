namespace WOWA.BLL.Validation;

public enum Severity
{
	Warning,
	Error
}

public class ValidationResult(string message, Severity severity) : IEquatable<ValidationResult>
{
	public string Message { get; } = message;
	public Severity Severity { get; } = severity;

	public bool Equals(ValidationResult? other)
	{
		if (ReferenceEquals(null, other)) return false;
		if (ReferenceEquals(this, other)) return true;
		return Message == other.Message && Severity == other.Severity;
	}

	public override bool Equals(object? obj)
	{
		if (ReferenceEquals(null, obj)) return false;
		if (ReferenceEquals(this, obj)) return true;
		if (obj.GetType() != GetType()) return false;
		return Equals((ValidationResult)obj);
	}

	public override int GetHashCode()
	{
		return HashCode.Combine(Message, (int)Severity);
	}
}