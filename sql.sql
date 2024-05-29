WITH sales_by_store AS (
  SELECT "itemNumber", "vendorNumber", "vendorName", SUM("volumeSold(Liters)") AS total_sold
  FROM liquor
  GROUP BY "itemNumber", "vendorNumber", "vendorName"
),
item_sales AS (
	SELECT "itemNumber", "itemDescription",
		SUM("volumeSold(Liters)") AS liters, 
		AVG("stateBottleRetail") AS price
		FROM liquor
		GROUP BY "itemNumber","itemDescription"
)
SELECT i_s."itemNumber", i_s."itemDescription", i_s."liters", i_s."price", st."itemNumber", st."vendorName", st."total_sold"
FROM sales_by_store st
JOIN item_sales i_s ON st."itemNumber" = i_s."itemNumber"
	SELECT "itemNumber", "itemDescription",
		SUM("volumeSold(Liters)") AS liters, 
		AVG("stateBottleRetail") AS price
		FROM liquor
		GROUP BY "itemNumber","itemDescription"


SELECT "itemNumber", "vendorNumber", SUM("volumeSold(Liters)") AS total_sold
 FROM liquor
 GROUP BY "itemNumber", "vendorNumber"
 SELECT "vendorNumber", "vendorName"
 FROM liquor 