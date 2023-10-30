# Overview of the Submission

**What Has Been Done:**

1. **Server Setup:** A TypeScript-based server has been set up using the Express.js framework. The server exposes an endpoint for calculating congestion tax based on provided inputs, including the city, vehicle type, and an array of date-times.

2. **Configuration File:** The tax rules for Gothenburg, including tax rates and exemptions, have been moved to a configuration file (`taxRules.json`) to allow for easy modification and extensibility.

3. **Separation of Concerns:** The code has been structured into separate modules, including `congestionTaxCalculator.ts`, which handles tax calculation, and `vehicleType.model.ts`, which contains an enum for vehicle types.

4. **Rule Enforcement:** The code enforces tax exemptions based on the vehicle type, the maximum daily tax amount of 60 SEK per vehicle, and the tax rates during specific time intervals.

**Potential Improvements:**

1. **More Flexible Configuration:** To make the system more configurable for different cities, you can extend the configuration file format to handle multiple cities with varying rules. For instance, you can structure the JSON file to contain rules and exemptions for different cities.

2. **Dynamic Data Loading:** Implement a mechanism to load city-specific tax rules and exemptions dynamically based on the city parameter provided in the request. This allows the system to adapt to different cities without code changes.

3. **Advanced Date and Time Handling:** To handle edge cases more accurately, consider using a date and time library, such as `moment.js` or the built-in `Date` object, for precise date and time calculations. This is especially important when considering leap years, daylight saving time, and transitions between years.

4. **Validation:** Implement robust input validation to ensure that the provided data is accurate and complete. Additionally, consider error handling and proper response codes (e.g., 404 for invalid city) for better client communication.

5. **Testing:** Extensive unit testing and integration testing should be performed to ensure the correctness of the system, especially when dealing with complex date and time scenarios.

6. **Logging and Auditing:** Implement logging to record important events, such as tax calculations, and consider an auditing mechanism to track system usage and changes to tax rules.

7. **Web Interface:** Provide a user-friendly web interface for configuring tax rules and exemptions. This can be useful for city administrators and content editors.

8. **Performance Optimization:** Depending on the expected load, consider optimizing the system for performance, such as caching frequently used data or using a more efficient data structure to store tax rules.

9. **Security:** Ensure that the server is secure, especially if it handles sensitive information. Implement appropriate security measures, such as authentication and authorization.

10. **Error Handling:** Enhance error handling by providing meaningful error messages in responses to help clients identify and resolve issues.

The specific improvements to be made depend on the use case, requirements, and constraints of the application. It's essential to thoroughly test and validate any changes made to the system to ensure its accuracy and reliability.


# Edge Cases: and Questions

**Edge Cases:**

1. **Year Transition:** How does the system handle date-times that transition between two different years, e.g., December 31st, 11:59 PM, and January 1st, 12:01 AM? Is the tax applied for each year separately?

2. **Daylight Saving Time (DST):** How does the system handle date-times that are affected by daylight saving time changes? For example, when the clock shifts forward or backward, how is the tax calculated?

3. **Leap Year:** Does the system account for leap years and the extra day in February?

4. **Multiple Cities:** If you extend the system to work for multiple cities, what happens when a vehicle passes from one city to another with different tax rules? How do you handle such transitions?

5. **Daylight Hours:** How does the system handle date-times that cross multiple tax periods within a single day? For example, a vehicle passing through multiple tax periods in a short duration, such as 05:59 AM to 06:01 AM.

**Open Questions:**

7. **Data Source:** Where and how are tax rules, public holidays, and vehicle exemptions stored and managed? Are they maintained in a database, configuration files, or some external service?

8. **Accuracy:** How accurate is the system in terms of tax calculation, especially for complex scenarios like overlapping time periods and exemptions?

9. **Performance:** How does the system handle a large number of incoming requests and calculations? Are there performance optimizations in place?

10. **User Interface:** Is there a user interface for configuring tax rules, exemptions, and viewing calculated taxes? How is the system intended to be used by city administrators or content editors?

11. **Logging and Auditing:** Is there logging and auditing in place to track tax calculations and any exceptions that might occur?

12. **Testing:** What kind of testing, including unit tests, integration tests, and system tests, has been conducted to ensure the correctness of the system?


# Submission Screenshots

![Screenshot of Swagger](https://github.com/uday4393/congestion-tax-calculator/raw/main/screenshots/swagger.png)

![Screenshot of Response](https://github.com/uday4393/congestion-tax-calculator/raw/main/screenshots/response.png)
